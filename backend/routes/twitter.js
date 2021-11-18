const express = require("express");
const { TwitterMediaDownloader,TwitterInquire } = require("../controllers/twitter");
const router = express.Router();

router.route("/profile_media").post(TwitterMediaDownloader);
router.route("/inquire").post(TwitterInquire);

module.exports = router;
