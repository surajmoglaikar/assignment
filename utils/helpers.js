function successObj(message, result) {
  if (isObject(result)) {
      return {
          flag: true,
          message: message,
          result: result
      };
  }
  else {
      return {
          flag: true,
          message: message,
          result: { data: result }
      };
  }
}

function errorObj(message, error, code = 000000) {
  return {
    message: message,
    error: error,
    code: code,
  };
}

function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
}

//To convert from string to MD5.
function MD5(string) {
  var crypto = require("crypto");
  var md5crypt = crypto.createHash("md5");
  md5crypt.update(string);
  return md5crypt.digest("hex");
}

function generateUUID() {
  var currentTime = new Date().getTime();

  var randNumber = Math.random();

  var shuffledString = str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

  return MD5(currentTime + randNumber + shuffledString);
}

function getTimeSeconds() {
  return Math.floor(new Date() / 1000);
}

function generateOTP() {
  var min = 1000;
  var max = 9999;
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function str_shuffle(string) {
  var parts = string.split("");
  for (var i = parts.length; i > 0; ) {
    var random = parseInt(Math.random() * i);
    var temp = parts[--i];
    parts[i] = parts[random];
    parts[random] = temp;
  }
  return parts.join("");
}
function prepareSocketResponse(data, eventName) {
  return {
    evt: eventName,
    data: data,
  };
}
function objectLength(object) {
  if (!object) return 0;
  return Object.keys(object).length;
}

module.exports = {
  successObj: successObj,
  errorObj: errorObj,
  generateUUID: generateUUID,
  getTimeSeconds: getTimeSeconds,
  prepareSocketResponse: prepareSocketResponse,
  objectLength: objectLength,
  generateOTP: generateOTP,
};
