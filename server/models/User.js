const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phoneCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  panNo: { type: String, required: true, uppercase: true },
  aadharNo: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
