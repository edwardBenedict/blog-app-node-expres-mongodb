const Blog = require("../models/blogs");

const adminIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", {
        title: "Admin Page",
        blogger: "EdBen",
        blogs: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const admniAdd = (req, res) => {
  res.render("addnewblog", { title: "New Blog", blogger: "EdBen" });
};

const adminAddPost = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

const adminDeletePost = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  adminIndex,
  admniAdd,
  adminAddPost,
  adminDeletePost,
};
