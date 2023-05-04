const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, "Nama game harus diisi"],
      },
      category: {
        type: String,
        require: [true, "Kategori harus diisi"],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, "Nama koin harus diisi"],
      },
      coinQuantity: {
        type: String,
        require: [true, "Jumlah koin harus diisi"],
      },
      price: {
        type: Number,
      },
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang minimal nama harus  3 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Nama akun harus diisi"],
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang minimal nama harus  3 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: {
        type: String,
        require: [true, "Nama player harus diisi"],
      },
      phoneNumber: {
        type: Number,
        require: [true, "Nama harus diisi"],
        maxlength: [13, "Panjang phone number harus antara 3 - 13 karakter"],
        minlength: [9, "Panjang minimal phohe number harus  9 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
