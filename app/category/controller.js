const Category = require("./model.js");
module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();
      console.log(name);
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      console.log(category);
      res.render("admin/category/edit", {
        category,
      });
    } catch (error) {}
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOneAndRemove({
        _id: id,
      });
      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
};
