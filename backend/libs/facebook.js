const axios = require("axios");
const cheerio = require("cheerio");
const Socket = require("./classes/Socket");
const makeArchive = require("./helpers/task");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const PhotoProcessor = require("./photos");

const ProcessLink = (link) => {
    return new URL(link);
}
const GetIdFromLink = async (link, cookies) => {
    const regexs = [/profile_id=([a-z0-9\-]+)/,/owner_id=([a-z0-9\-]+)/];

    const LinkData = ProcessLink(link)
    const data = {}
    if (LinkData.pathname === "/profile.php") {
        data.id = LinkData.searchParams.get("id")
        data.username = LinkData.searchParams.get("id")
    } else {
        data.username = LinkData.pathname.replace("/","");
    }

    const HTML = await GetUserPage(data.username, cookies)
    const $ = cheerio.load(HTML);
    data.name = $("title").text()
    if (!data.id) {
        const regExpress = regexs.filter((expression) => {
            return HTML.match(expression)
        })[0]
        data.id =  HTML.match(regExpress)[1]
    }
    return data

};

const GetUserPage = async (username, cookies) => {

    const {data} = await axios.get(`https://mbasic.facebook.com/${username}`, {
        headers: {
            cookie: `c_user=${cookies.c_user}; xs=${cookies.xs};`,
        },
    });
    return data
}

const GetProfilePicture = async (user_id) => {
    if (!user_id) return new ApiError(httpStatus.BAD_REQUEST, "User Id is Required")
    return (await axios.get(`https://graph.facebook.com/${user_id}/picture?width=1080&access_token=${config.FacebookAccess}`)).request.res.responseUrl


};
const GetFacebookTargetInfo = async (url) => {
    const userPictureData = await PhotoProcessor.GenderDetection(url)
    const userPictureOnCloud = await PhotoProcessor.ImageToCloud(url)

    return {
        userPictureData, userPictureOnCloud
    }
}
const GetFacebookUserInfo = async (userId) => {
    const userPicture = await GetProfilePicture(userId)
    const userPictureData = await PhotoProcessor.GenderDetection(userPicture)
    const userPictureOnCloud = await PhotoProcessor.ImageToCloud(userPicture)

    return {
        userPictureData, userPictureOnCloud,userId
    }
}

// exports.get_download_links_for_public_photos = async (link, xs, c_user,id) => {
//   Socket.sendMessage("PHASE_I", { xs,id });
//
//   try {
//     let all_photos = [];
//
//     const username = await this.get_id_from_link(link, c_user, xs);
//     const all_photos_url = await unique_profile_photos_links(
//       username.id,
//       xs,
//       c_user,id
//     );
//     let is_more = await get_photos_per_page(
//       all_photos,
//       all_photos_url,
//       c_user,
//       xs,id
//     );
//     while (is_more.more) {
//       filter = is_more.more.replace("amp;", "");
//       is_more = await get_photos_per_page(
//         all_photos,
//         `https://mbasic.facebook.com${filter}`,
//         c_user,
//         xs,id
//       );
//     }
//
//     return { photosArray: all_photos, status: 200 };
//   } catch (error) {
//     Socket.sendMessage("ERROR", {
//       xs,
//       error: JSON.stringify(error),
//       id
//     });
//
//     return { photosArray: [], status: 500 };
//   }
// };
//
// const unique_profile_photos_links = async (username, xs, c_user ,id) => {
//   Socket.sendMessage("PHASE_II", { xs ,id});
//
//   try {
//     const URL_PHOTOS = `https://mbasic.facebook.com/profile.php?id=${username}&v=photos`;
//     const photos_view = await axios.get(URL_PHOTOS, {
//       headers: {
//         cookie: `c_user=${c_user}; xs=${xs};`,
//       },
//     });
//     const HTML = photos_view.data;
//
//     var soup = new JSSoup(HTML);
//
//     let all_a_tags = soup.findAll("a");
//     let element;
//
//     for (let i = 0; i < all_a_tags.length; i++) {
//       const a = all_a_tags[i]["attrs"].href;
//
//       if (a.includes("photoset")) {
//         element = a;
//       }
//     }
//
//     return `https://mbasic.facebook.com${element}`;
//   } catch (error) {
//     Socket.sendMessage("ERROR", {
//       xs,
//       error: JSON.stringify(error),id
//     });
//
//     console.log("get_photo_set_link");
//   }
// };
//
// const get_photos_per_page = async (all_photos, url, c_user, xs,id) => {
//   Socket.sendMessage("PHASE_III", { xs,id });
//
//   try {
//     const photos_url = await axios.get(url, {
//       headers: {
//         cookie: `c_user=${c_user}; xs=${xs};`,
//       },
//     });
//     let is_has_more;
//
//     var soup = new JSSoup(photos_url.data);
//     const page_photo = soup.findAll("a");
//
//     for (let i = 0; i < page_photo.length; i++) {
//       const photo = page_photo[i]["attrs"];
//
//       if (photo.href.includes("/photo.php?fbid=")) {
//         all_photos.push(photo.href);
//       }
//       if (photo.href.includes("offset=")) {
//         is_has_more = photo.href;
//       } else {
//         is_has_more = false;
//       }
//     }
//
//     return { more: is_has_more };
//   } catch (error) {
//     Socket.sendMessage("ERROR", {
//       xs,
//       error: JSON.stringify(error),id
//     });
//
//     console.log("get_photos_per_page");
//     return { more: false };
//   }
// };
//
// exports.profile_photos_direct_link = async (imgArray, c_user, xs, link,id) => {
//   const photos_ids = [];
//   const direct_links = [];
//   for (let i = 0; i < imgArray.length; i++) {
//     const img = imgArray[i];
//     p = img.split("/photo.php?fbid=")[1].split("&")[0];
//     photos_ids.push(p);
//   }
//
//   for (let p = 0; p < photos_ids.length; p++) {
//     const photo_id = photos_ids[p];
//     const URL = `https://mbasic.facebook.com/photo/view_full_size/?fbid=${photo_id}`;
//     const PHOTO_HTML = await axios.get(URL, {
//       headers: {
//         cookie: `c_user=${c_user}; xs=${xs};`,
//       },
//     });
//
//     var soup = new JSSoup(PHOTO_HTML.data);
//     let direct_link;
//     const aTags = soup.findAll("a");
//     direct_link = aTags[0].attrs.href.replaceAll("amp;", "");
//     direct_links.push(direct_link);
//
//     Socket.sendMessage("PHASE_V", { xs, current: p + 1 ,id});
//   }
//   Socket.sendMessage("PHASE_VI", { xs ,id});
//
//   const { username } = await this.get_id_from_link(link, c_user, xs);
//   const download_link = await makeArchive(
//     direct_links,
//     username.replaceAll("/", ""),
//     "Facebook Profile Photo(s)",id
//   );
//   Socket.sendMessage("DONE", { xs, download_link ,id});
//
//   return { download_link, direct_links };
// };
//
// String.prototype.replaceAll = function (str1, str2, ignore) {
//   return this.replace(
//     new RegExp(
//       str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
//       ignore ? "gi" : "g"
//     ),
//     typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2
//   );
// };

module.exports = {
    GetProfilePicture, GetIdFromLink,GetFacebookTargetInfo,GetFacebookUserInfo
}