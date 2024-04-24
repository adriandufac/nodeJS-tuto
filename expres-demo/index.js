const config = require("config");
const startupDebugger = require("debug")("app:startup"); //we define the namespace here app:startup
const dbDebugger = require("debug")("app:db"); //we define the namespace here app:startup
// NEED TO DEFINE AN ENV VARIABLE DEBUG = APP:DB  to use this debugger
const express = require("express");
const Joi = require("joi");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug"); // to be able to return HTML
app.set("views", "./views"); // default value to store views

// ways to know wich env we are :
console.log(` environnement : ${process.env.NODE_ENV}`); //undefined by default
console.log(` environnement : ${app.get("env")}`); //development by default

app.use(express.json()); // to enable json body in request
app.use(helmet()); // third party middleware to secure http request

app.use("/api/courses", courses);
app.use("/", home);

console.log(config.get("mail.host"));

// we log only on dev environment
if (app.get("env") === "development" || app.get("env") === "local") {
  app.use(morgan("tiny")); // third party middleware to LOG HTTP REQUEST
  startupDebugger("Morgan enable");
}
dbDebugger("Connected to the database");

// app.use (express.urlencoded) // to read URL encoded
// app.use (express.static('FOLDERNAME')) // serve static content (txt for exemple if FOLDERNAME/test.txt we can go at http://localhost:3000/test.txt) to display the file

//middleware function

app.use(logger);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
