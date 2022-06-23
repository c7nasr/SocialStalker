const Joi = require("joi");
const ProfilePicture = {
    body:Joi.object({
        link: Joi.string().required().trim().uri().regex(/\bfacebook.com\b/).message("Error in Validate Inputs"),
        xs:Joi.string().required().trim().message("Error in Validate Inputs"),
        c_user:Joi.string().trim().required().regex(/^\d+$/).message("Error in Validate Inputs")
    })
}

module.exports = { ProfilePicture }