var path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const jwtPrivateKey = process.env.jwtPrivateKey;
module.exports = function () {
  if (!jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};