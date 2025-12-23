// src/server.js
const dotenv = require("dotenv");
const app = require("./app");
const pool = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5005;

async function start() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to MySQL");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
}

start();
