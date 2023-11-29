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
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  if (!req.params.date) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } else if (!moment(req.params.date, "x", true).isValid()) {
    res.json({ error: "Invalid Date" });
  } else {
    let date = moment(req.params.date, "x", true);
    res.json({
      unix: req.params.date,
      utc: date.format("ddd, DD MMM YYYY HH:mm:ss") + " GMT",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + process.env.PORT);
  //   console.log("Your app is listening on port " + listener.address().port);
});
