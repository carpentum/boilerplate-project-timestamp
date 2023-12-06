// index.js
// where your node app starts
var moment = require("moment");
require("dotenv").config();
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.status(200).json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  if (!req.params.date) {
    return res.status(200).json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }
  if (req.params.date.includes("-")) {
    return res.status(200).json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString(),
    });
  }
  if (new Date(req.params.date)) {
    return res.status(200).json({
      unix: new Date(parseInt(req.params.date)).getTime(),
      utc: new Date(parseInt(req.params.date)).toUTCString(),
    });
  }
  res.status(400).json({
    error: "Invalid",
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + process.env.PORT);
  //   console.log("Your app is listening on port " + listener.address().port);
});
