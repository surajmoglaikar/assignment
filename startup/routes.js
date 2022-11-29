const express = require("express");
const path = require("path");
const user = require("../routes/user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/upload", express.static("upload"));
  app.use("/user", user);
};
