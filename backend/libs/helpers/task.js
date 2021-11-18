const archiver = require("archiver");
const uuid = require("uuid");
const { default: axios } = require("axios");
const fs = require("fs");
const randomBytes = require("crypto");
const Socket = require("../classes/Socket");
const { TwitterStatusUpdate } = require("../twitter");

exports.makeArchive = async (links, username, service, job_id) => {
  try {
    const FILE_PATH = `./tasks/${username}.zip`;
    const FILE_NAME = `${username}_${service}_${randomBytes
      .randomBytes(4)
      .toString("hex")}.zip`;
    const output = fs.createWriteStream(FILE_PATH);

    const archive = archiver("zip", {
      zlib: { level: 1 },
    });
    archive.pipe(output);
    const { status, error } = await makeBuffers(
      links,
      archive,
      username,
      job_id,
      service
    );
    if (status === 200) {
      await archive.finalize();
      return await uploadFile(FILE_PATH, FILE_NAME,job_id)
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);

    return null;
  }
};
const makeBuffers = async (imgs, archive, username, job_id,service) => {
  try {
    // Filter to Prevent Errors
    let images_filtered_arr = imgs.filter(function (el) {
      return el.startsWith("https://");
    });
    let count = images_filtered_arr.length;

    for (let image = 0; image < images_filtered_arr.length; image++) {
      try {
        const i = images_filtered_arr[image];
        const r = await axios.get(i, {
          responseType: "arraybuffer",
        });
        let bf = Buffer.from(r.data, "binary");
        archive.append(bf, {
          name: `${username}_${Date.now().toString()}.png`,
        });
        if (service === "Twitter Media Downloader"){
        await  TwitterStatusUpdate(i,`Zipping Photos ${
            ((image+1) / count) * 100
          }%`,job_id)
        }
        Socket.sendMessage("PHOTO", { id: job_id, photo: i, total: count,current:image+1 });
      } catch (error) {
        console.log(error);
      }
    }
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 400, error };
  }
};
const uploadFile = async (path, fname,job_id) => {
  try {

    var admin = require("firebase-admin");
    let serviceAccount = require("../../nhub-40369-firebase-adminsdk-1zspt-2e903fe4c3.json");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "nhub-40369.appspot.com",
      });
    }
    let bucket = admin.storage().bucket();
    let filename = path;
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid.v4(),
      },
    };

    const res = await bucket.upload(filename, {
      gzip: true,
      metadata: metadata,
      public: true,
      destination: `${fname}`,
    });

    return res[0].metadata.mediaLink;
  } catch (error) {
    console.log(error);
  }
};
