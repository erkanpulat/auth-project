// packages
const express = require("express");
const dotenv = require("dotenv").config();
const exphbs = require("express-handlebars");
const path = require("path");

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

// routes
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome" });
});

app.use((req, res, next) => {
  res.json({ message: "404 NOT FOUND!" });
});

// app start
app.listen(process.env.PORT, () => {
  console.log(
    `App listening at http://${process.env.HOST}:${process.env.PORT} 🚀 `
  );
});
