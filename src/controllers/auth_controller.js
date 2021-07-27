const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
// passport strategy
require("../config/passport_local")(passport);

// login page
const getLoginPage = (req, res, next) => {
  res.render("pages/login", { layout: "auth_layout", title: "Giriş Yap"});
};
// login
const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send validation errors and fields with flash messages
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);
    res.redirect("/login");
  } else {
    req.flash("email", req.body.email);
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }
};

// logout
const logout = (req, res, next) => {
  req.logout(); // delete session-passport-user_id in db
  req.session.destroy((error) => {
    res.clearCookie("connect.sid"); // clear cookie in browser
    res.render("pages/login", {
      layout: "auth_layout",
    title: "Çıkış Yap",
      success_message: [{ msg: "Başarıyla çıkış yapıldı." }],
    });
  });
};

// register page
const getRegisterPage = (req, res, next) => {
  res.render("pages/register", { layout: "auth_layout", title:"Kayıt Ol" }); // the response is finished - flash messages disappeared
};
// register
const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send validation errors and fields with flash messages
    req.flash("validation_error", errors.array());
    req.flash("firstName", req.body.firstName);
    req.flash("lastName", req.body.lastName);
    req.flash("email", req.body.email);
    res.redirect("/register"); // the response is not finished
  } else {
    try {
      // email control
      const user = await User.findOne({ email: req.body.email });
      // if user registration already exists
      if (user && user.emailActive) {
        req.flash("validation_error", [
          { msg: "Email adresi sisteme kayıtlıdır." },
        ]);
        req.flash("firstName", req.body.firstName);
        req.flash("lastName", req.body.lastName);
        req.flash("email", req.body.email);
        res.redirect("/register");
      } else {
        // If there is a user and the email address is not active, delete the user
        if (user && !user.emailActive) {
          await User.findByIdAndRemove({ _id: user._id });
        }
        // create new user
        const newUser = new User(req.body);
        // encrypt user's password
        newUser.password = await bcrypt.hash(req.body.password, 10);
        await newUser.save();

        // jwt payload
        const jwtPayload = {
          id: newUser._id,
          email: newUser.email,
        };
        // jwt token
        const jwtToken = jwt.sign(
          jwtPayload,
          process.env.CONFIRM_MAIL_JWT_SECRET,
          {
            expiresIn: "1d", // valid for one day
          }
        );

        // mail send URL with jwt token
        const verifyURL = process.env.WEB_SITE_URL + "verify?id=" + jwtToken;

        // transporter object
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        // preparing email template -> nodemailer-express-handlebars
        transporter.use(
          "compile",
          hbs({
            viewEngine: {
              extName: ".handlebars",
              layoutsDir: path.join(__dirname, "../views/layouts/"),
              defaultLayout: "verify_email_layout",
            },
            extName: ".handlebars",
            viewPath: path.join(__dirname, "../views/pages/"),
          })
        );

        // send mail with defined transport object
        await transporter.sendMail(
          {
            from: `Auth Projesi <${process.env.GMAIL_USER}>`,
            to: newUser.email,
            subject: "Email Adresinizi Onaylayınız",
            text:
              "Email adresinizi doğrulamak için linke tıklayınız: " + verifyURL,
            template: "email_template",
            context: {
              verifyURL,
            },
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              transporter.close();
            }
          }
        );

        req.flash("success_message", [
          {
            msg: "Kaydınız başarılıdır. Email adresinizi onayladıktan sonra sisteme giriş yapabilirsiniz.",
          },
        ]);

        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// forget-password page
const getFPasswordPage = (req, res, next) => {
  res.render("pages/forget_password", { layout: "auth_layout", title:"Şifremi Unuttum" });
};

// forget-password
const fPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // email address is invalid
    // send validation errors and fields with flash messages
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);
    res.redirect("/forget-password");
  } else {
    // email address is valid
    try {
      // email and emailActive control
      const user = await User.findOne({
        email: req.body.email,
        emailActive: true,
      });
      // if user found
      if (user) {
        // jwt payload
        const jwtPayload = {
          id: user._id,
          email: user.email,
        };
        // jwt token
        const jwtToken = jwt.sign(
          jwtPayload,
          process.env.RESET_PASSWORD_JWT_SECRET + "-" + user.password,
          {
            expiresIn: "1d", // valid for one day
          }
        );

        const resetURL = `${process.env.WEB_SITE_URL}reset-password/${user._id}/${jwtToken}`;

        // transporter object
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        // send mail with defined transport object
        await transporter.sendMail(
          {
            from: `Auth Projesi <${process.env.GMAIL_USER}>`,
            to: user.email,
            subject: "Şifre Sıfırlama",
            text: "Şifrenizi sıfırlamak için linke tıklayınız: " + resetURL,
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              transporter.close();
            }
          }
        );

        req.flash("success_message", [
          {
            msg: "Şifre sıfırlama bağlantısı email adresinize iletilmiştir. Şifrenizi yeniledikten sonra sisteme giriş yapabilirsiniz.",
          },
        ]);

        res.redirect("/login");
      } else {
        // if user not found
        req.flash("validation_error", [
          { msg: "Kullanıcı bulunamadı veya hesabınız aktif değil!" },
        ]);
        req.flash("email", req.body.email);
        res.redirect("/forget-password");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// reset-password page
const getRPasswordPage = async (req, res, next) => {
  const id = mongoose.Types.ObjectId.isValid(req.params.id)
    ? req.params.id
    : undefined;
  const token = req.params.token;

  if (id && token) {
    const user = await User.findOne({ _id: id });
    // if user found
    if (user) {
      // jwt verify
      jwt.verify(
        token,
        process.env.RESET_PASSWORD_JWT_SECRET + "-" + user.password,
        async (error, decoded) => {
          // if the token is invalid
          if (error) {
            req.flash("error", [
              "Doğrulama kodu daha önce kullanıldı veya süresi geçti!",
            ]);
            res.redirect("/forget-password");
          } else {
            // token is valid - successful
            res.render("pages/reset_password", {
              layout: "auth_layout",
              title: "Şifre Sıfırlama",
              url: req.url,
            });
          }
        }
      );
    } else {
      // if user not found
      req.flash("error", ["Doğrulama kodu hatalı veya eksik!"]);
      res.redirect("/forget-password");
    }
  } else {
    // if token or id not found
    req.flash("error", ["Doğrulama kodu hatalı veya eksik!"]);
    res.redirect("/forget-password");
  }
};

const rPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // password validation error or passwords don't match
    req.flash("validation_error", errors.array());
    res.redirect(req.body.url);
  } else {
    try {
      // id and token in form
      const id = mongoose.Types.ObjectId.isValid(req.body.url.split("/")[2])
        ? req.body.url.split("/")[2]
        : undefined;
      const token = req.body.url.split("/")[3];

      const user = await User.findOne({
        _id: id,
      });

      // if user found
      if (user) {
        // jwt verify - improve security
        jwt.verify(
          token,
          process.env.RESET_PASSWORD_JWT_SECRET + "-" + user.password,
          async (error, decoded) => {
            // if token is invalid
            if (error) {
              req.flash("error", [
                "Şifreniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz.",
              ]);
              res.redirect("/forget-password");
            } else {
              // if token is valid
              // password update
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              const result = await User.findByIdAndUpdate(id, {
                password: hashedPassword,
              });
              if (result) {
                // password update succesfull
                req.flash("success_message", [
                  {
                    msg: "Şifreniz başarıyla güncellenmiştir. Sisteme giriş yapabilirsiniz.",
                  },
                ]);
                res.redirect("/login");
              } else {
                // password update failed
                req.flash("error", [
                  "Şifreniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz.",
                ]);
                res.redirect("/forget-password");
              }
            }
          }
        );
      } else {
        // if user not found
        req.flash("error", [
          "Şifreniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz.",
        ]);
        res.redirect("/forget-password");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// verify email
const verifyMail = (req, res, next) => {
  const token = req.query.id;
  if (token) {
    try {
      // jwt verify
      jwt.verify(
        token,
        process.env.CONFIRM_MAIL_JWT_SECRET,
        async (error, decoded) => {
          // if the token is invalid
          if (error) {
            req.flash("error", ["Doğrulama kodu hatalı veya süresi geçti!"]);
            res.redirect("/login");
          } else {
            // emailActive update
            const idInToken = decoded.id;
            const result = await User.findByIdAndUpdate(idInToken, {
              emailActive: true,
            });
            if (result) {
              // emailActive update succesfull
              req.flash("success_message", [
                {
                  msg: "Email adresiniz onaylandı. Sisteme giriş yapabilirsiniz.",
                },
              ]);
              res.redirect("/login");
            } else {
              // emailActive update failed
              req.flash("error", ["Lütfen tekrar kayıt yapınız."]);
              res.redirect("/login");
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    req.flash("error", ["Doğrulamak için token bulunamadı veya geçersiz!"]);
    res.redirect("/login");
  }
};

module.exports = {
  getLoginPage,
  login,
  getRegisterPage,
  register,
  getFPasswordPage,
  fPassword,
  getRPasswordPage,
  rPassword,
  logout,
  verifyMail,
};
