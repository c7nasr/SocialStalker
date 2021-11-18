const mongoose = require("mongoose");
const TwitterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    id: {
      type: String,
    },
    full_name: { type: String },
    gender: { type: String, default: null },
    data: {},
    media:{type:String },
    profile_picture:{type:String},

    user:{},
    active:{default:true,type:Boolean},
    status:{},
    current:{},
    operation:{type:String}

  },
  { timestamps: true }
);

const Twitter = mongoose.model("Twitter", TwitterSchema);

module.exports = Twitter;
