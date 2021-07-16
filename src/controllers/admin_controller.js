// user home page
const getHomePage = (req, res, next) => {
  res.render("pages/admin/home_page", { layout: "admin/home_layout" });
};

module.exports = {
  getHomePage,
};
