const express = require("express");
const { ProfilePicture, ProfilePhotos } = require("../controllers/facebook");
const router = express.Router();

router.route("/profile_picture").post(ProfilePicture);
router.route("/profile_photos").post(ProfilePhotos);

module.exports = router;
