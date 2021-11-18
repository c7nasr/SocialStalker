const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())

const Facebook = require("./routes/facebook")
const Instagram = require("./routes/instagram")
const Twitter = require("./routes/twitter")

// 1) MIDDLEWARE
app.use(function (req, res, next) {
  next();
});

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/facebook", Facebook);
app.use("/instagram", Instagram);
app.use("/twitter", Twitter);


app.all("*", (req, res) => {
  res.sendStatus(401)
});

module.exports = app;
