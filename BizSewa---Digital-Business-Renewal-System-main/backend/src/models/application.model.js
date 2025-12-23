// src/models/application.model.js
const pool = require("../config/db");

async function createApplication({
  businessId,
  applicantUserId,
  type,
}) {
  const [result] = await pool.query(
    `INSERT INTO applications 
    (business_id, applicant_user_id, type, status, submitted_at)
     VALUES (?, ?, ?, 'PENDING', NOW())`,
    [businessId, applicantUserId, type]
  );
  return { id: result.insertId };
}

async function getApplicationsByApplicant(userId) {
  const [rows] = await pool.query(
    `SELECT a.*, b.business_name, b.registration_no
     FROM applications a
     JOIN businesses b ON a.business_id = b.id
     WHERE a.applicant_user_id = ?
     ORDER BY a.submitted_at DESC`,
    [userId]
  );
  return rows;
}

async function getPendingApplications() {
  const [rows] = await pool.query(
    `SELECT a.*, b.business_name, u.name AS applicant_name
     FROM applications a
     JOIN businesses b ON a.business_id = b.id
     JOIN users u ON a.applicant_user_id = u.id
     WHERE a.status = 'PENDING'
     ORDER BY a.submitted_at ASC`
  );
  return rows;
}

async function findApplicationById(id) {
  const [rows] = await pool.query(
    `SELECT a.*, 
            b.id AS business_id, b.registration_no, b.business_name, 
            b.business_type, b.address
     FROM applications a
     JOIN businesses b ON a.business_id = b.id
     WHERE a.id = ?`,
    [id]
  );
  return rows[0];
}

async function updateApplicationStatus({ id, status, officerId, remarks }) {
  await pool.query(
    `UPDATE applications 
     SET status = ?, officer_id = ?, officer_remarks = ?, decided_at = NOW()
     WHERE id = ?`,
    [status, officerId, remarks, id]
  );
}

module.exports = {
  createApplication,
  getApplicationsByApplicant,
  getPendingApplications,
  findApplicationById,
  updateApplicationStatus,
};
