const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: "google-login", // Значення за замовчуванням для Google користувачів,
  }
});
module.exports = mongoose.model("User", userSchema);

