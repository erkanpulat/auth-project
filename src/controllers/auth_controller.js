const User = require("../models/User");
const { validationResult } = require("express-validator");

// login
const getLoginPage = (req, res, next) => {
  res.render("pages/login", { layout: "auth_layout" });
};

// register
const getRegisterPage = (req, res, next) => {
  res.render("pages/register", { layout: "auth_layout" }); // the response is finished - flash messages disappeared
};

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send validation errors and fields with flash messages
    req.flash("validation_error", errors.array());
    req.flash("firstName", req.body.firstName);
    req.flash("lastName", req.body.lastName);
    req.flash("email", req.body.email);
    res.redirect("/register"); // the response is not finished
  } else {
    res.redirect("/login");
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
  getRegisterPage,
  register,
  getFPasswordPage,
  getRPasswordPage,
};
