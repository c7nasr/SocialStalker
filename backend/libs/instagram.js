const { default: axios } = require("axios");
const request = require("request-promise-native");

extract_instagram_username_from_link = async (link) => {
  const URL_PARSER = new URL(link);
  let username = URL_PARSER.pathname;
  return username.replace("/", "");
};
exports.convertImageToBase = async (link) => {

  let jpgDataUrlPrefix = "data:image/png;base64,";

  const baseReq = await request({
    url: link,
    method: "GET",
    encoding: null, // This is actually important, or the image string will be encoded to the default encoding
  })
  let imageBuffer = Buffer.from(baseReq);
  let imageBase64 = imageBuffer.toString("base64");
  let imageDataUrl = jpgDataUrlPrefix + imageBase64;

  return imageDataUrl
};
const filterURL = (url) => {
  return url.replace(/\/$/, "");
}
extract_instagram_user_id = async (link, session_id, u_id) => {
  try {
    const username = await extract_instagram_username_from_link(link);
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`
    const { data } = await axios.get(
      filterURL(url),
      {
        headers: {
          cookie: `sessionid=${session_id};ds_user_id=${u_id};`,
          "x-ig-app-id":"936619743392459",
          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
        },
      }
    );
    return { user_id: data.data.user.id };
  } catch (err) {
    console.log(err);
    return { user_id: 0 };
  }
};
exports.extract_image_with_info = async (link, session_id, u_id) => {
  try {
    const { user_id } = await extract_instagram_user_id(link, session_id, u_id);

    const { data } = await axios.get(
      `https://i.instagram.com/api/v1/users/${user_id}/info`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
          cookie: `sessionid=${session_id};ds_user_id=${u_id};`,
        },
      }
    );

    return { user: data.user, photo: data.user.hd_profile_pic_url_info.url };
  } catch (error) {
    // console.log(error)
    return { user: {}, photo: null };
  }
};

exports.current_user_info = async (session_id, u_id) => {
  try {
    const { data } = await axios.get(
      "https://i.instagram.com/api/v1/accounts/current_user",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
          cookie: `sessionid=${session_id};ds_user_id=${u_id};`,
        },
      }
    );
    return {
      current_user: data.user,
      current_user_photo: data.user.hd_profile_pic_url_info.url,
    };
  } catch (error) {
    return { current_user: {}, current_user_photo: null };
  }
};
