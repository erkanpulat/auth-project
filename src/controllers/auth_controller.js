const User = require("../models/User");

// login
const getLoginPage = (req, res, next) => {
  res.render("pages/login", { layout: "auth_layout" });
};

module.exports = {
  getLoginPage,
};
