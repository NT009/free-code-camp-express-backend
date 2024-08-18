let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config();
console.log("Hello World");
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req?.method} ${req?.path} - ${req?.ip}`);
  next();
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = {};
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = { message: "HELLO JSON" };
  } else {
    message = { message: "Hello json" };
  }
  res.json(message);
});
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);
app.get("/:word/echo", (req, res) => {
  const echo = req.params.word;
  res.json({ echo });
});
app
  .route("/name")
  .get((req, res) => {
    const query = req.query;
    res.json({ name: `${query.first} ${query.last}` });
  })
  .post((req, res) => {
    const body = req.body;
    res.json({ name: `${body.first} ${body.last}` });
  });

module.exports = app;
