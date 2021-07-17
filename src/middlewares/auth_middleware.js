const loggedIn = function (req, res, next) {
  // if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  } else {
    // show error and redirect login page, if user is not authenticated
    req.flash("error", ["Sayfaya erişmek için giriş yapınız!"]);
    res.redirect("/login");
  }
};

const notLoggedIn = function (req, res, next) {
  // if user is not authenticated
  if (!req.isAuthenticated()) {
    return next();
  } else {
    // redirect home page, if user is authenticated
    res.redirect("/home");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  res.redirect("/404");
};

const isUser = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next();
  }
  res.redirect("/404");
};

module.exports = {
  loggedIn,
  notLoggedIn,
  isAdmin,
  isUser,
};
