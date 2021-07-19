const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        const user = await User.findOne({ email });
        //  data(passwords) to compare
        const bcryptPassword = user
          ? await bcrypt.compare(password, user.password)
          : false;
        // if the user is not found or the password does not match
        if (!user || !bcryptPassword) {
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
