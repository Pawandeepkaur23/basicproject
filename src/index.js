const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://pravinpatekar:ViNYZfuU1QiUWiuR@cluster0.4kuvznv.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("server app listening on port " + (process.env.PORT || 3001));
});
