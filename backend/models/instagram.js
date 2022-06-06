const mongoose = require("mongoose");
const InstagramSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    id: {
      type: String,
    },
    type: { type: String },
    gender: { type: String, default: null },
    photo: { type: String },
    user: {},
    full_name: { type: String },
    hash:{type: String}
  },
  { timestamps: true }
);

const Instagram = mongoose.model("Instagram", InstagramSchema);

module.exports = Instagram;
