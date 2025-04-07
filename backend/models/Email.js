const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Email", emailSchema);
