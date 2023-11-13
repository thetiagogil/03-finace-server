require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);

// ROUTES
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// TO HANDLE ROUTES THAT DON'T EXIST
require("./error-handling")(app);

module.exports = app;
