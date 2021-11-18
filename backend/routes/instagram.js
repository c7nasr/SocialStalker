const express = require("express");
const { InstagramProfilePicture } = require("../controllers/instagram");
const router = express.Router();

router.route("/profile_picture").post(InstagramProfilePicture);

module.exports = router;
