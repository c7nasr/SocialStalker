const express = require("express");
const { GetCountries, GetGenders, GetUsersGenders, GetUsers, GetUsersStats, AdminLogin, GetByCountry, getAllRecordsFacebook, getAllRecordsInstagram, hashAllRecordsFacebook, hashAllRecordsInstagram} = require("../controllers/admin");
const {VerifyToken} = require("../libs/auth");
const router = express.Router();

// router.route("/countries").get(VerifyToken,GetCountries);
// router.route("/genders").get(VerifyToken,GetGenders);
// router.route("/users/gender").get(VerifyToken,GetUsersGenders);
// router.route("/users").get(VerifyToken,GetUsers);
// router.route("/").get(VerifyToken,GetUsersStats);
// router.route("/login").post(AdminLogin);
// router.route("/search/country").post(GetByCountry);
// router.route("/facebookers").get(getAllRecordsFacebook).post(hashAllRecordsFacebook);
// router.route("/instagramers").get(getAllRecordsInstagram).post(hashAllRecordsInstagram);

module.exports = router;
