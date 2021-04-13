var express = require("express");
const morgan = require("morgan");
var app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./models/blogs");

var PORT = process.env.PORT;

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trainingcluster.tpyei.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, function (err) {
      if (err) console.log("Error in server setup");
      console.log("Server listening on Port", `http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Something went wrong!", error);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Main Page",
        blogger: "EdBen",
        blogs: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", blogger: "EdBen" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login", blogger: "EdBen" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404", blogger: "EdBen" });
});
