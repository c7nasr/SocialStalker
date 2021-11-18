var FormData = require("form-data");
const { default: axios } = require("axios");

async function ImageToHost(ImageLink) {
  var newFormData = new FormData();

  try {
    newFormData.append("file", ImageLink);
    newFormData.append("upload_preset", "ml_default");
    var config = {
      method: "post",
      url: "https://api.cloudinary.com/v1_1/cnasr/image/upload",
      headers: {
        ...newFormData.getHeaders(),
      },
      data: newFormData,
    };

    const { data } = await axios(config);
    if (data.url) {
      return { HostedImage: data.url };
    }
  } catch (error) {
    console.log(error);
    return { HostedImage: null };
  }
}
module.exports = ImageToHost;
