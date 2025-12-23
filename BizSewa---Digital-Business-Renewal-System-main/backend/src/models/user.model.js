// src/models/user.model.js
const pool = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}

async function createUser({ name, email, passwordHash, role }) {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())",
    [name, email, passwordHash, role]
  );
  return { id: result.insertId, name, email, role };
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
