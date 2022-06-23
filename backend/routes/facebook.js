const express = require("express");
const { ProfilePicture, ProfilePhotos } = require("../controllers/facebook");
const validate = require("../libs/validation");
const Facebook = require("../libs/validation/facebook.validation");
const {InfoAndSourceRecorder} = require("../libs/middlewares/user.info");
const router = express.Router();

router.route("/profile_picture").post(validate(Facebook.ProfilePicture),InfoAndSourceRecorder,ProfilePicture);
router.route("/profile_photos").post(ProfilePhotos);

module.exports = router;
