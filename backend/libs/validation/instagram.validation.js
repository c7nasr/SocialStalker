const Joi = require("joi");
const InstagramProfilePictureValidation = {
    body:{
        link:Joi.string().required().uri().trim(),
        u_id:Joi.string().required().trim(),
        sid:Joi.string().required().trim()
    }
}

module.exports = {
    InstagramProfilePictureValidation
}