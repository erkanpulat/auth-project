// home page - scissors crossover :D
const getHomePage = (req, res, next) => {
  if (req.user.isAdmin) {
    res.redirect("/admin/home");
  } else {
    res.redirect("/user/home");
  }
};

module.exports = {
  getHomePage,
};
