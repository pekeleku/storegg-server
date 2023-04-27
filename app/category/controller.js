module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "expressjs",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
