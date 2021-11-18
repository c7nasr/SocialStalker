const { default: axios } = require("axios");
const FormData = require("form-data");

exports.detect_gender = async (image) => {
  try {
    var API_LINK = "https://api-us.faceplusplus.com/facepp/v3/detect";

    const form = new FormData();
    form.append("image_url", image);
    form.append("api_secret", "wV-TmOJnb06MkCKQlv3RuX9nmwihLzm9");
    form.append("api_key", "k15FycrGFc3pnM4tFWJzfaR__HFe6KnN");
    form.append("return_attributes", "gender,age");
    const { data } = await axios.post(API_LINK, form, {
      headers: form.getHeaders(),
    });

    if (data.face_num != 0) {
      const { gender } = data.faces[0].attributes;
      return {
        detected: data.face_num,
        gender: gender.value,
      };
    } else {
      return {
        detected: 0,
        gender: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      detected: 0,
      gender: false,
    };
  }
};
