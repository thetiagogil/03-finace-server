const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

module.exports = (app) => {
  // EXPRESS NEEDS TO KNOW IT SHOULD TRUST THIS SETTING
  app.set("trust proxy", 1);

  // CONTROLS HEADER TO PASS HEADER FROM FRONTEND
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
