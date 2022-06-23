const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({path: path.join(__dirname, './../.env')});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(5001),
        DATABASE: Joi.string().required().description('Mongo DB url'),
        DATABASE_PASSWORD: Joi.string().required().description('Mongo DB Password'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        IP_INFO_API: Joi.string().required().description("IP Info API Access"),
        FACEBOOK_ACCESS: Joi.string().required().description("Facebook Access Token"),
        FACE_PLUS_API: Joi.string().required().description("Face++ API Key"),
        FACE_PLUS_SECRET: Joi.string().required().description("Face++ Secret Key")

    })
    .unknown();

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV, port: envVars.PORT, mongoose: {
        url: envVars.DATABASE + (envVars.NODE_ENV === 'test' ? '-test' : ''), options: {
            useNewUrlParser: true, useUnifiedTopology: true,
        }, password: envVars.DATABASE_PASSWORD
    }, jwt: {
        secret: envVars.JWT_SECRET, accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    }, IP: envVars.IP_INFO_API, FacebookAccess: envVars.FACEBOOK_ACCESS, FacePlus: {
        secret: envVars.FACE_PLUS_SECRET, key: envVars.FACE_PLUS_API
    }
};
