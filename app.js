var express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
var app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

const PORT = process.env.PORT;

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trainingcluster.tpyei.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.use("/", authRoutes);
app.use("/admin", requireAuth, adminRoutes);
app.use("/blog", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About", blogger: "EdBen" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404", blogger: "EdBen" });
});
