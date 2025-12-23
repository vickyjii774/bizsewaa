// src/models/business.model.js
const pool = require("../config/db");

async function createBusiness({
  ownerUserId,
  businessName,
  businessType,
  address,
  contactNo,
}) {
  const registrationNo = "REG-" + Date.now(); // simple example
  const [result] = await pool.query(
    `INSERT INTO businesses 
    (owner_user_id, registration_no, business_name, business_type, address, contact_no,
     registration_date, expiry_date, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 'ACTIVE', NOW())`,
    [ownerUserId, registrationNo, businessName, businessType, address, contactNo]
  );
  return {
    id: result.insertId,
    registration_no: registrationNo,
    business_name: businessName,
    business_type: businessType,
  };
}

async function getBusinessesByOwner(ownerUserId) {
  const [rows] = await pool.query(
    "SELECT * FROM businesses WHERE owner_user_id = ?",
    [ownerUserId]
  );
  return rows;
}

async function findBusinessById(id) {
  const [rows] = await pool.query("SELECT * FROM businesses WHERE id = ?", [
    id,
  ]);
  return rows[0];
}

async function updateBusinessExpiry(businessId) {
  await pool.query(
    "UPDATE businesses SET expiry_date = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE id = ?",
    [businessId]
  );
}

module.exports = {
  createBusiness,
  getBusinessesByOwner,
  findBusinessById,
  updateBusinessExpiry,
};
