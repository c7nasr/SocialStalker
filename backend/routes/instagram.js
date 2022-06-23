const express = require("express");
const { InstagramProfilePicture } = require("../controllers/instagram");
const validate = require("../libs/validation");
const InstagramValidation = require("../libs/validation/instagram.validation");
const {InfoAndSourceRecorder} = require("../libs/middlewares/user.info");
const router = express.Router();

router.route("/profile_picture").post(validate(InstagramValidation.InstagramProfilePictureValidation),InfoAndSourceRecorder, InstagramProfilePicture);

module.exports = router;
