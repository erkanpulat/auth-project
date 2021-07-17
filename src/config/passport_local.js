const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  const options = {
    // diff fields options
    usernameField: "email",
    passwordField: "password",
  };

  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        // matching user in database
        const user = await User.findOne({ email, password });
        if (!user) {
          // error,user,options
          return done(null, false, { message: "Email veya şifre hatalı!" });
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  // store user.id in a session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // get user(session->user.id) from database
  passport.deserializeUser(function (id, done) {
    //  hidden fields : _id and password
    User.findById(id, { _id: 0, password: 0 }, function (err, user) {
      done(err, user);
    });
  });
};
