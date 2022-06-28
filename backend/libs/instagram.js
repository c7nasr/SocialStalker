const {default: axios} = require("axios");
const request = require("request-promise-native");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const PhotoProcessor = require("./photos");
const Leaks = require("./leaks");
const InstagramConfig = (cookies, isPc = false) => {
    const MobileAgent = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
    }
    const PCAgent = {
        "x-ig-app-id": "936619743392459",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
    }
    const userAgent = isPc ? PCAgent : MobileAgent
    return {
        headers: {
            cookie: `sessionid=${cookies.sid};ds_user_id=${cookies.u_id};`,...userAgent
        },
    }
}
const GetUsernameFromLink = (link) => {
    return new URL(link).pathname.replace("/", "");
};
const filterURL = (url) => {
    return url.replace(/\/$/, "");
}
const GetUserId = async (link, cookies) => {
    const username = GetUsernameFromLink(link)
    const {data} = await axios.get(filterURL(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`), InstagramConfig(cookies, true));
    return data?.data?.user?.id;
}
const GetPhotoFromLink = async (link, cookies) => {

    try {
        const userId = await GetUserId(link, cookies)
        const {data} = await axios.get(`https://i.instagram.com/api/v1/users/${userId}/info`, InstagramConfig(cookies));
        return {user: data.user, photo: data.user.hd_profile_pic_url_info.url};
    } catch (e) {
        return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "userId Can't be found")
    }

};

const GetUserInfo = async (cookies) => {
    try {
        const {data} = await axios.get("https://i.instagram.com/api/v1/accounts/current_user", InstagramConfig(cookies));
        return {
            userData: data.user, userPhoto: data.user.hd_profile_pic_url_info.url,id:data.user.pk
        };
    } catch (e) {
        return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "userId Can't be found")
    }


};

const GetInstagramTargetInfoFromPhoto = async (url) => {
    const userPictureData = await PhotoProcessor.GenderDetection(url)
    const userPictureOnCloud = await PhotoProcessor.ImageToCloud(url)


    return {
        userPictureData, userPictureOnCloud
    }
}

const GetInstagramUserInfo = async (cookies) => {
    const {userData,userPhoto} = await GetUserInfo(cookies)
    const userPictureData = await PhotoProcessor.GenderDetection(userPhoto)

    const userPictureOnCloud = await PhotoProcessor.ImageToCloud(userPhoto)

    return {
        userPictureOnCloud,userData,userPictureData
    }
}

module.exports = {
    GetPhotoFromLink, GetUserInfo, GetInstagramTargetInfoFromPhoto,GetInstagramUserInfo
}