const loggedIn = function (req, res, next) {
  // if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  } else {
    // if user is not authenticated, show error and redirect login page
    req.flash("error", ["Sayfaya erişmek için giriş yapınız!"]);
    res.redirect("/login");
  }
};

const notLoggedIn = function (req, res, next) {
  // if user is not authenticated
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  loggedIn,
  notLoggedIn,
};
