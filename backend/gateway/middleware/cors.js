"use strict;"

async function setHTTPHeaders(req, res, next) {

  if (process.env.ENV.localeCompare("DEVELOPMENT") != 0) {
    res.setHeader("Access-Control-Allow-Origin", "https://skilledge.site");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.setHeader("Access-Control-Max-Age", "600");

  if (req.method == "OPTIONS") {
    res.status(200).send();
    return;
  }

  next();
}

module.exports = {
  setHTTPHeaders
}