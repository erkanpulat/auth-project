// user home page
const getHomePage = (req, res, next) => {
  res.render("pages/user/home_page", { layout: "user/home_layout" });
};

module.exports = {
  getHomePage,
};
