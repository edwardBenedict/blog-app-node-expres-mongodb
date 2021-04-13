const Blog = require("../models/blogs");

const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Blog Page",
        blogger: "EdBen",
        blogs: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const blogContent = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blogger: "EdBen", blog: result, title: "Details" });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "404", blogger: "EdBen" });
    });
};

module.exports = {
  blogIndex,
  blogContent,
};
