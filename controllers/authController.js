const jwt = require("jsonwebtoken");
const User = require("../models/users");

const maxAge = 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, "secret key", { expiresIn: maxAge });
};

const loginGet = (req, res) => {
  res.render("login", { title: "Login", blogger: "EdBen" });
};

const loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
};

const signUpGet = (req, res) => {
  res.render("signup", { title: "Register", blogger: "EdBen" });
};

const signUpPost = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
const logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

module.exports = {
  loginGet,
  loginPost,
  signUpGet,
  signUpPost,
  logoutGet,
};
