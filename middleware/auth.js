const jwt = require("jsonwebtoken");
const config = require("config");
const HelperUtils = require("../utils/helpers");
const Models = require("../models");

async function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send(HelperUtils.errorObj("Access denied. No token provided."));

  try {
    let payload = await Models.Session.findOne({
      where: {
        sid: token,
      },
    });
    req.user = payload;
    
    next();
  } catch (ex) {
    res.status(400).send(HelperUtils.errorObj("Invalid token."));
  }
}

module.exports = authMiddleware;
