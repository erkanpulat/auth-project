// packages
const express = require("express");
const dotenv = require("dotenv").config();
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
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
  helpers: {},
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./src/views"));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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
