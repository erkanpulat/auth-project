// packages
const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const helpers = require("handlebars-helpers");
const passport = require("passport");
// routers
const authRouter = require("./src/routers/auth_router");

// db connection
require("./src/config/db_connection");

// app
const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: true }));

// static file middleware
app.use(express.static("public"));

// handlebars configuration
const hbs = exphbs.create({
  helpers: {
    comparison: helpers.comparison(),
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
  res.locals.firstName = req.flash("firstName");
  res.locals.lastName = req.flash("lastName");
  res.locals.email = req.flash("email");
  next();
});

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

let count = 0;
// routes
app.get("/", (req, res, next) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.json({ message: "Welcome", count: req.session.count });
});

app.use("/", authRouter);

app.use((req, res, next) => {
  res.render("pages/404", { layout: "error_layout" });
});

// app start
app.listen(process.env.PORT, () => {
  console.log(
    `App listening at http://${process.env.HOST}:${process.env.PORT} 🚀 `
  );
});
