const User = require("../models/User");
const { validationResult } = require("express-validator");
const passport = require("passport");
// passport strategy
require("../config/passport_local")(passport);

// login
const getLoginPage = (req, res, next) => {
  res.render("pages/login", { layout: "auth_layout" });
};

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
      success_message: [{ msg: "Başarıyla çıkış yapıldı." }],
    });
  });
};

// register
const getRegisterPage = (req, res, next) => {
  res.render("pages/register", { layout: "auth_layout" }); // the response is finished - flash messages disappeared
};

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
      if (user) {
        req.flash("validation_error", [
          { msg: "Email adresi sisteme kayıtlıdır." },
        ]);
        req.flash("firstName", req.body.firstName);
        req.flash("lastName", req.body.lastName);
        req.flash("email", req.body.email);
        res.redirect("/register");
      } else {
        // if no user registration is available
        const newUser = new User(req.body);
        await newUser.save();
        req.flash("success_message", [
          {
            msg: "Kaydınız başarılı bir şekilde gerçekleşmiştir. Sisteme giriş yapabilirsiniz",
          },
        ]);
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// forget-password
const getFPasswordPage = (req, res, next) => {
  res.render("pages/forget_password", { layout: "auth_layout" });
};

// reset-password
const getRPasswordPage = (req, res, next) => {
  res.render("pages/reset_password", { layout: "auth_layout" });
};

module.exports = {
  getLoginPage,
  login,
  getRegisterPage,
  register,
  getFPasswordPage,
  getRPasswordPage,
  logout,
};
