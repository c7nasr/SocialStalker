const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App running on port " + port + "...");
});
