const express = require("express");
var path = require("path");
var envPath = path.join(__dirname, ".env");
require("dotenv").config({ path: envPath });
const app = express();
var http = require("http");


const APP_ENV = process.env.NODE_ENV || "development";
const HTTPS = process.env.HTTPS
  ? JSON.parse(process.env.HTTPS.toLowerCase())
  : true;


require("./startup/routes")(app);
require("./startup/config")();


const APP_PORT = process.env.APP_PORT;
let API_URL =
  "http://" + process.env.API_URL_BASE || `http://localhost:${APP_PORT}`;
let server = http.createServer(app);

  
global.__basedir = __dirname;

process.env.API_URL = API_URL;

// starting the server
server.listen(APP_PORT, () => {
  console.log(
    "App started successfully.\nEnvironment: " +
      APP_ENV +
      "\nHTTPS: " +
      HTTPS +
      "\nBackend running on: " +
      API_URL
  );
});

