const express = require("express");
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const requestIp = require('request-ip');
const useragent = require('express-useragent');
const httpStatus = require('http-status');
const helmet = require("helmet");


const Facebook = require("./routes/facebook")
const Instagram = require("./routes/instagram")
const Admin = require("./routes/admin")
const {errorConverter, errorHandler} = require("./utils/Errors");
const ApiError = require("./utils/ApiError");
const morgan = require("./config/morgan");
const config = require("./config/config");

const app = express();

app.use(requestIp.mw())
app.use(useragent.express());


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// 3) ROUTES
app.use("/facebook", Facebook);
app.use("/instagram", Instagram);
app.use("/admin", Admin);


app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND));
});
app.use(errorConverter);
app.use(errorHandler);


module.exports = app;
