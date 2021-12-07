module.exports = {
  index(req, res, next) {
    try {
      res.render("index", {
        title: "ini pug",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
