const User = require("../models/User");
const { validationResult } = require("express-validator");
const multer = require("multer");
// admin home page
const getHomePage = async (req, res, next) => {
  try {
    // destructuring
    const [
      {
        // default value
        totalNumOfUsers = 0,
        thisMthNumOfUsers = 0,
        emailVerNumOfUsers = 0,
        totalNumOfAdmins = 0,
      },
    ] = await User.aggregate([
      {
        $facet: {
          // total number of users
          totalNumOfUsers: [{ $match: { isAdmin: false } }, { $count: "num" }],
          // number of users this month
          thisMthNumOfUsers: [
            {
              $match: {
                isAdmin: false,
                createdAt: {
                  $gt: new Date(
                    // this month / 01 / this year 00:00:00
                    `${
                      new Date().getMonth() + 1
                    }/01/${new Date().getFullYear()}`
                  ),
                },
              },
            },
            { $count: "num" },
          ],
          // Number of email verified users
          emailVerNumOfUsers: [
            { $match: { isAdmin: false, emailActive: true } },
            { $count: "num" },
          ],
          // total number of admin
          totalNumOfAdmins: [{ $match: { isAdmin: true } }, { $count: "num" }],
        },
      },
      {
        $project: {
          totalNumOfUsers: {
            $arrayElemAt: ["$totalNumOfUsers.num", 0],
          },
          thisMthNumOfUsers: { $arrayElemAt: ["$thisMthNumOfUsers.num", 0] }, // thisMthNumOfUsers={num[1]} ->[{..}]
          emailVerNumOfUsers: { $arrayElemAt: ["$emailVerNumOfUsers.num", 0] },
          totalNumOfAdmins: { $arrayElemAt: ["$totalNumOfAdmins.num", 0] },
        },
      },
    ]);

    res.render("pages/admin/dashboard", {
      layout: "admin/home_layout",
      title: "Admin Ana Sayfa",
      user: JSON.parse(JSON.stringify(req.user)),
      totalNumOfUsers,
      thisMthNumOfUsers,
      emailVerNumOfUsers,
      // percentile
      emailVerPercUsers: parseInt(
        isNaN(emailVerNumOfUsers / totalNumOfUsers)
          ? 0
          : (emailVerNumOfUsers / totalNumOfUsers) * 100,
        10
      ),
      totalNumOfAdmins,
    });
  } catch (error) {
    console.log(error);
  }
};

// users table page
const getUserTablePage = async (req, res, next) => {
  const allUsers = await User.find(
    { isAdmin: false },
    { password: 0, isAdmin: 0 }
  ).lean();

  res.render("pages/admin/users_table", {
    layout: "admin/home_layout",
    title: "Kullanıcılar Tablosu",
    user: JSON.parse(JSON.stringify(req.user)),
    allUsers,
  });
};

// delete user on users-table
const deleteUser = async (req, res, next) => {
  try {
    const sonuc = await User.findByIdAndDelete({ _id: req.params.id });
    if (sonuc) {
      res.redirect("/admin/users-table");
    } else {
      console.log("Kullanıcı bulunamadı.");
    }
  } catch (err) {
    console.log(err);
  }
};

// admin profile page
const getProfilePage = async (req, res, next) => {
  res.render("pages/admin/profile", {
    layout: "admin/home_layout",
    title: "Profil Ayarları",
    user: JSON.parse(JSON.stringify(req.user)), // copy object
  });
};

// admin profile update
const profileUpdate = async (req, res, next) => {
  // express-validator errors
  const errors = Array.from(validationResult(req).array());
  // multer file filter error
  if (req.file_error) errors.push({ msg: req.file_error });
  if (errors.length > 0) {
    // send validation errors and fields with flash messages
    req.flash("validation_error", errors);
    req.flash("firstName", req.body.firstName);
    req.flash("lastName", req.body.lastName);
    res.redirect("/admin/profile");
  } else {
    try {
      // req.file - multer
      if (req.file) {
        req.body.avatar = req.file.filename;
      }
      const result = await User.findByIdAndUpdate(req.user._id, {
        ...req.body,
      });
      if (result) {
        // profile update succesfull
        req.flash("success_message", [
          {
            msg: "Profiliniz başarıyla güncellenmiştir.",
          },
        ]);
        res.redirect("/admin/profile");
      } else {
        // profile update failed
        req.flash("validation_error", [
          {
            msg: "Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz.",
          },
        ]);
        res.redirect("/admin/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  getHomePage,
  getUserTablePage,
  deleteUser,
  getProfilePage,
  profileUpdate,
};
