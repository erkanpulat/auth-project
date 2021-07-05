const User = require("../models/User");
const { validationResult } = require("express-validator");

// login
const getLoginPage = (req, res, next) => {
  res.render("pages/login", { layout: "auth_layout" });
};

// register
const getRegisterPage = (req, res, next) => {
  res.render("pages/register", { layout: "auth_layout" });
};

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.redirect("/register");
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
