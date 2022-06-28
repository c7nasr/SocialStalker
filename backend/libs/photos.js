const FormData = require("form-data");
const config = require("../config/config");
const axios = require("axios");
const imageHash = require("node-image-hash");
const request = require("request-promise-native");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Photos = require("../models/Photos");

const GenderDetection = async (url) => {
    const DetectionData = {
        faceCount: 0, gender: "Error"
    }
    const form = new FormData();

    try {


        const API_LINK = "https://api-us.faceplusplus.com/facepp/v3/detect";
        form.append("image_url", url);
        form.append("api_key", config.FacePlus.key);
        form.append("api_secret", config.FacePlus.secret);
        form.append("return_attributes", "gender,age");
        const {data, status} = await axios.post(API_LINK, form, {
            headers: form.getHeaders(),
        });
        if (status !== 200) return DetectionData
        DetectionData.faceCount = data.face_num

        if (data.face_num > 0) {
            const {gender} = data.faces[0].attributes;
            DetectionData.gender = gender.value

        } else {
            DetectionData.gender = "Not Detected"

        }

        return DetectionData
    } catch (e) {
        return DetectionData
    }
}
const ImageToCloud = async (url) => {
    const newFormData = new FormData();

    try {
        newFormData.append("file", url);
        newFormData.append("upload_preset", "ml_default");


        const {data} = await axios.post('https://api.cloudinary.com/v1_1/cnasr/image/upload', newFormData, {
            headers: {
                ...newFormData.getHeaders(),
            },
        });
        return data?.url;
    } catch (error) {
        return null;
    }
}

const fileToBuffer = async (file) => {
    try {
        const response = await axios.get(file, {responseType: 'arraybuffer'})
        return Buffer.from(response.data, "utf-8")

    } catch (e) {
        return null
    }
}
const HashImage = async (url) => {
    const buffer = await fileToBuffer(url)
    return (await imageHash.hash(buffer, 16)).hash

}

const convertImageUrlToBase64 = async (link) => {

    try {
        let jpgDataUrlPrefix = "data:image/png;base64,";
        const buffer = await request({ url: link,method: "GET",encoding: null,})
        let imageBuffer = Buffer.from(buffer);
        let imageBase64 = imageBuffer.toString("base64");
        return jpgDataUrlPrefix + imageBase64
    }catch (e) {
        return new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Can't Convert URL2Base64")
    }


};
const findByHash = (hash, username) => {
    return Photos.findOne({hash, username})
}
module.exports = {
    GenderDetection, ImageToCloud,
    HashImage,
    findByHash,
    convertImageUrlToBase64
}