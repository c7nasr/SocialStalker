import {
  beep,
  clearStorage,
  get_cookies,
  get_current_url,
  openPopupAndSendMessage,
  sendMessage,
} from "../libs/libs";

import axios from "axios";

const API_LINK = "https://s0cialstalker.herokuapp.com/twitter/";
const DOMAIN = "https://www.twitter.com/";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}
export const TwitterProfileMedia = async () => {
  // Prepare Cookies
  const x_token = await get_cookies("ct0", DOMAIN);
  const twitter_sess = await get_cookies("_twitter_sess", DOMAIN);
  const guest_id = await get_cookies("guest_id", DOMAIN);
  const auth_token = await get_cookies("auth_token", DOMAIN);
  const personalization_id = await get_cookies("personalization_id", DOMAIN);
  const twid = await get_cookies("twid", DOMAIN);
  const req_cookies = `_twitter_sess=${twitter_sess};ct0=${x_token};auth_token=${auth_token};guest_id=${guest_id};personalization_id=${personalization_id};twid=${twid}`;

  // Get Profile Link
  const profile_link = await get_current_url();

  if (profile_link.includes("/media"))
    return alert("Please Make sure you're on Profile Page NOT Media Page");

  // Send Request to API
  const { data } = await axios.post(`${API_LINK}profile_media`, {
    link: profile_link,
    x_token,
    cookies: req_cookies,
  });

  // OPEN POPUP and Receive the Message

  await openPopupAndSendMessage("twitter_media", {
    id: data.operation,
    username: data.username,
  });

  const operation = data.operation;
  let isActive = true;
 
  while (isActive) {
    const {
      data: { status, media, active, current },
    } = await axios.post(`${API_LINK}inquire`, {
      id: operation,
    });
    await sendMessage({ status, media, current });
    if (!active) {
      isActive = false;
      beep()
      break;
    }

    await sleep(0.5);
  }
};
