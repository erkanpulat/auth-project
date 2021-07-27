// packages
const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const methodOverride = require("method-override");
// helpers
const helpers = require("handlebars-helpers");
const adminHelpers = require("./src/helpers/admin_helpers");
// routers
const publicRouter = require("./src/routers/public_router");
const authRouter = require("./src/routers/auth_router");
const userRouter = require("./src/routers/user_router");
const adminRouter = require("./src/routers/admin_router");
// middlewares
const authMiddleware = require("./src/middlewares/auth_middleware");

// db connection
require("./src/config/db_connection");

// app
const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: true }));
// lets you use HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));

// static file middleware
// it should be defined here so that no session is created in every request
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// handlebars configuration
const hbs = exphbs.create({
  helpers: {
    comparison: helpers.comparison(),
    generateDate: adminHelpers.generateDate,
    activeStatusTurn: adminHelpers.activeStatusTurn,
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./src/views"));

// session db conf
const sessionStore = new MongoDBStore({
  uri: `mongodb://${process.env.HOST}/${process.env.DB_NAME}`,
  collection: "sessions",
});

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: sessionStore,
  })
);

// flash message middlewares
app.use(flash());

app.use((req, res, next) => {
  // flash messages
  // res.locals, available only to the view(is) rendered during that request / response cycle (if any).
  res.locals.validation_error = req.flash("validation_error");
  res.locals.success_message = req.flash("success_message");
  res.locals.login_error = req.flash("error");
  res.locals.firstName = req.flash("firstName");
  res.locals.lastName = req.flash("lastName");
  res.locals.email = req.flash("email");
  next();
});

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", publicRouter);

app.use("/", authRouter);

app.use("/user", userRouter);

app.use("/admin", adminRouter);

// 404 route
app.use(authMiddleware.loggedIn, (req, res, next) => {
  res.render("pages/404", { layout: "error_layout" });
});

// app start
app.listen(process.env.PORT, () => {
  console.log(
    `App listening at http://${process.env.HOST}:${process.env.PORT} 🚀 `
  );
});
