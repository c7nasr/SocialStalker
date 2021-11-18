const {
  extract_image_with_info,
  convertImageToBase,
} = require("../libs/instagram");
const { BackgroundProcess } = require("../libs/classes/BackgroundProcess");
const { Recorder } = require("../libs/classes/Recorder");

exports.InstagramProfilePicture = async (req, res) => {
  try {
    const { link, sid, u_id } = req.body;

    const { photo, user } = await extract_image_with_info(link, sid, u_id);

    if (photo && user) {
      new BackgroundProcess("instagram:profile_picture");

      const recorder = new Recorder("instagram:record");

      await recorder.instagramProfilePictureRecorder({
        target: { photo, user, link },
        sid,
        u_id,
        req,
      });
      const baseImage = await convertImageToBase(photo);
      return res
        .status(200)
        .json({ image: photo, base: baseImage, username: user.username });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
