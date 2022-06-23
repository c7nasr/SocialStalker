// const { RedisCloud } = require("./Redis");
//
// const Queue = require("bull");
//
// const Facebook = require("../../models/facebook");
// const Instagram = require("../../models/instagram");
// const {
//   get_facebook_user_profile_full_photo,
//   get_id_from_link,
// } = require("../facebook");
//
// const { current_user_info } = require("../instagram");
//
// const { detect_gender } = require("../helpers/gender.detection");
// const ImageToHost = require("../helpers/image.to.host");
// const { get_ip_info } = require("../helpers/ip");
// const Twitter = require("../../models/twitter");
//
// class Recorder {
//   constructor(ProcessName) {
//     this.ProcessName = ProcessName;
//     this.Redis = new RedisCloud();
//   }
//
//   async facebookProfilePictureRecorder(recorderData) {
//     const queue = new Queue(
//       this.ProcessName,
//       this.Redis.RedisCloudInitialization()
//     );
//     queue.add(null, this.opts);
//
//     queue.process(async (job, done) => {
//       const user_profile_picture = await get_facebook_user_profile_full_photo(
//         recorderData.c_user
//       );
//       // Detect Gender for Searching Data.
//       const user_photo_info = await detect_gender(user_profile_picture);
//       const target_face_info = await detect_gender(recorderData.target);
//
//       // Host Photos on OUR Host
//       const hosted_target_photo = await ImageToHost(recorderData.target);
//       const hosted_USER_photo = await ImageToHost(user_profile_picture);
//
//       // Get User IP Info
//       const user_ip_data = await get_ip_info(recorderData.req);
//       await Facebook.create({
//         user: {
//           user_id: recorderData.c_user,
//           session: recorderData.xs,
//           photo: hosted_USER_photo.HostedImage,
//           face_info: user_photo_info,
//           gender: user_photo_info.gender,
//           ip: user_ip_data,
//         },
//         username: recorderData.target_data.username,
//         id: recorderData.target_data.id,
//         gender: target_face_info.gender,
//         photo: hosted_target_photo.HostedImage,
//         full_name: recorderData.target_data.name,
//         type: "Facebook Profile Picture",
//       });
//       done(null);
//     });
//   }
//
//   async instagramProfilePictureRecorder({ target, sid, u_id, req }) {
//     const queue = new Queue(
//       this.ProcessName,
//       this.Redis.RedisCloudInitialization()
//     );
//     queue.add(null, this.opts);
//
//     queue.process(async (job, done) => {
//       try {
//         const { current_user, current_user_photo } = await current_user_info(
//           sid,
//           u_id
//         );
//         // Detect Gender for Searching Data.
//         const target_face_info = await detect_gender(target.photo);
//         const user_photo_info = await detect_gender(current_user_photo);
//
//         // Host Photos on OUR Host
//         const hosted_target_photo = await (
//           await ImageToHost(target.photo)
//         ).HostedImage;
//         const hosted_USER_photo = await (
//           await ImageToHost(current_user_photo)
//         ).HostedImage;
//
//         // Get User IP Info
//         const user_ip_data = await get_ip_info(req);
//         // Get User IP Info
//
//         await Instagram.create({
//           username: target.user.username,
//           id: target.user.pk,
//           type: "Instagram Profile Picture",
//           gender: target_face_info.gender,
//           photo: hosted_target_photo,
//           full_name: target.user.full_name,
//           user: {
//             session: sid,
//             id: u_id,
//             current_user,
//             current_user_photo,
//             gender: user_photo_info.gender,
//             photo: hosted_USER_photo,
//             ip: user_ip_data,
//             face_info: user_photo_info,
//             full_name: current_user.full_name,
//           },
//         });
//         done(null);
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   }
//
//   async facebookProfilePhotosRecorder({
//     link,
//     c_user,
//     xs,
//     req,
//     links,
//     direct,
//   }) {
//     const queue = new Queue(
//       this.ProcessName,
//       this.Redis.RedisCloudInitialization()
//     );
//     queue.add(null, this.opts);
//     queue.process(async (job, done) => {
//       const get_target_data = await get_id_from_link(link, c_user, xs);
//
//       // Get Full Profile Picture
//       const target_profile_picture = await get_facebook_user_profile_full_photo(
//         get_target_data.id
//       );
//       const user_profile_picture = await get_facebook_user_profile_full_photo(
//         c_user
//       );
//
//       // Detect Gender for Searching Data.
//       const user_photo_info = await detect_gender(user_profile_picture);
//       const target_face_info = await detect_gender(target_profile_picture);
//
//       // Host Photos on OUR Host
//       const hosted_target_photo = await ImageToHost(target_profile_picture);
//       const hosted_USER_photo = await ImageToHost(user_profile_picture);
//
//       // Get User IP Info
//       const user_ip_data = await get_ip_info(req);
//
//       await Facebook.create({
//         user: {
//           c_user,
//           xs,
//           photo: hosted_USER_photo.HostedImage,
//           face_info: user_photo_info,
//           gender: user_photo_info.gender,
//           ip: user_ip_data,
//         },
//         username: get_target_data.username,
//         id: get_target_data.id,
//         gender: target_face_info.gender,
//         photo: hosted_target_photo.HostedImage,
//         full_name: get_target_data.name,
//         type: "Facebook Profile Photos",
//         data: {
//           direct,
//           links,
//         },
//       });
//
//       done(null);
//     });
//   }
//
//   async TwitterMediaRecorder({ username, user, download_link ,req,taskId}) {
//     const queue = new Queue(
//       this.ProcessName,
//       this.Redis.RedisCloudInitialization()
//     );
//     queue.add(null, this.opts);
//     queue.process(async (job, done) => {
//       const user_ip_data = await get_ip_info(req);
//       const profile_picture = user.legacy.profile_image_url_https.replace("_normal", "")
//       const {gender} = await detect_gender(profile_picture);
//
//
//       await Twitter.findByIdAndUpdate(taskId,{
//         username,
//         data: user,
//         media: download_link,
//         id: user.rest_id,
//         profile_picture,
//         full_name: user.legacy.name,
//         gender,
//         user:{ip:user_ip_data},
//         active:false
//       });
//
//       done(null);
//     });
//   }
// }
// module.exports.Recorder = Recorder;
