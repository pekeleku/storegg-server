const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    name: {
      type: String,
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang minimal nama harus  3 karakter"],
      require: [true, "Nama harus diisi"],
    },
    userName: {
      type: String,
      maxlength: [225, "Panjang username harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang minimal username harus  3 karakter"],
      require: [true, "Nama harus diisi"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
      maxlength: [225, "Panjang nama maksimal - 225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    filename: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, "Nomor telepon harus diisi"],
      maxlength: [13, "Panjang phone number harus antara 3 - 13 karakter"],
      minlength: [9, "Panjang minimal phone number harus  9 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});
module.exports = mongoose.model("Player", playerSchema);
