const mongoose = require("mongoose");
const FacebookSchema = new mongoose.Schema(
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
    data:{},
    hash:{type: String}
  },
  { timestamps: true }
);

const Facebook = mongoose.model("Facebook", FacebookSchema);

module.exports = Facebook;
