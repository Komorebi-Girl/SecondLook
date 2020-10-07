const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  googleID: { type: String, required: true },
  isAdmin: { type: String, default: "N" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
