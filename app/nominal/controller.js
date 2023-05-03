const Nominal = require("./model.js");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();

      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
        name: req.session.user.name,
        title: "Halaman Nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        name: req.session.user.name,
        title: "Halaman Tambah Nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, price, coinQuantity } = req.body;
      let nominal = await Nominal({ coinName, price, coinQuantity });
      await nominal.save();

      req.flash("alertMessage", "Berhasil Tambah Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", {
        nominal,
        name: req.session.user.name,
        title: "Halaman Ubah Nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, price, coinQuantity } = req.body;
      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        { coinName, price, coinQuantity }
      );
      req.flash("alertMessage", "Berhasil Ubah Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findOneAndRemove({
        _id: id,
      });
      req.flash("alertMessage", "Berhasil Hapus Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
