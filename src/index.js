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
//middleware runs between request & response
//next : its basically a callback function
//pass the control to next middleware or next controller
//server flow will hang and does not pass the control

//authentication: check credentials (login Id, password)
//authorization: valid user
