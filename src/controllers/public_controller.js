// redirect home page - scissors crossover :D
const getHomePage = (req, res, next) => {
  if (req.user.isAdmin) {
    res.redirect("/admin/home");
  } else {
    res.redirect("/user/home");
  }
};

// redirect login page
const getLoginPage = (req, res, next) => {
  res.redirect("/login");
};

module.exports = {
  getHomePage,
  getLoginPage,
};
