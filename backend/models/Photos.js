const mongoose = require("mongoose");
const PhotosSchema = new mongoose.Schema(
    {
        username: String,
        id: String,
        gender: String,
        faceCount:Number,
        photo:String,
        user: Array,
        full_name: String,
        hash:String,
        service:String,
    },
    { timestamps: true }
);

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;
