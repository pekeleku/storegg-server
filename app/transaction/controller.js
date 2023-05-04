const Transaction = require("./model.js");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find().populate("player");
      console.log(transaction);
      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
        name: req.session.user.name,
        title: "Halaman Jenis Pembayaran",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      await Transaction.findByIdAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Berhasil Ubah Status");
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
