const { BackgroundProcess } = require("../libs/classes/BackgroundProcess");
const { randomBytes } = require("crypto");
const {
  get_id_from_link,
  get_facebook_user_profile_full_photo,
} = require("../libs/facebook");
const probe = require("probe-image-size");
const { Recorder } = require("../libs/classes/Recorder");

exports.ProfilePicture = async (req, res) => {
  try {
    const { link, c_user, xs } = req.body;

    const get_target_data = await get_id_from_link(link, c_user, xs);

    // Get Full Profile Picture
    const target_profile_picture = await get_facebook_user_profile_full_photo(
      get_target_data.id
    );

    const facebookRecordJob = new Recorder("facebook:record");
    await facebookRecordJob.facebookProfilePictureRecorder({
      service: "facebook:profile_picture",
      link,
      c_user,
      xs,
      req,
      target: target_profile_picture,
      target_data: get_target_data,
    });
    const {width,height} = await probe(target_profile_picture)
    return res.json({
      image: target_profile_picture,
      username: get_target_data.username.replace("/", ""),
      full_name: get_target_data.name,
      width,height
    });
  } catch (error) {
    // Logger
    console.error(error);

    return res.sendStatus(500);
  }
};

exports.ProfilePhotos = async (req, res) => {
  try {
    const { link, xs, c_user } = req.body;
    const profilePhotosJob = new BackgroundProcess("facebook:profile_photos");
    const job_id = randomBytes(16).toString("hex");
    profilePhotosJob.facebookProfilePhotosJob({
      link,
      xs,
      c_user,
      req,
      job_id,
    });

    return res.status(200).json({ operation: job_id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
