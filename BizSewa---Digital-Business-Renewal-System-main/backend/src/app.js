// src/app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const businessRoutes = require("./routes/business.routes");
const applicationRoutes = require("./routes/application.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Base path: /api
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
