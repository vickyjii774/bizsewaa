// src/controllers/application.controller.js
const Application = require("../models/application.model");
const Business = require("../models/business.model");

// GET /api/applications/my  (Citizen)
async function getMyApplications(req, res) {
  try {
    const apps = await Application.getApplicationsByApplicant(req.user.id);
    res.json(apps);
  } catch (err) {
    console.error("getMyApplications error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/applications/pending  (Officer)
async function getPendingApplications(req, res) {
  try {
    const apps = await Application.getPendingApplications();
    res.json(apps);
  } catch (err) {
    console.error("getPendingApplications error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/applications/:id
async function getApplicationById(req, res) {
  try {
    const id = req.params.id;
    const app = await Application.findApplicationById(id);
    if (!app) return res.status(404).json({ message: "Application not found" });

    // frontend expects application.business object
    const appResponse = {
      id: app.id,
      type: app.type,
      status: app.status,
      submitted_at: app.submitted_at,
      officer_remarks: app.officer_remarks,
      business: {
        id: app.business_id,
        registration_no: app.registration_no,
        business_name: app.business_name,
        business_type: app.business_type,
        address: app.address,
      },
    };

    res.json(appResponse);
  } catch (err) {
    console.error("getApplicationById error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/applications/:id/approve
async function approveApplication(req, res) {
  try {
    const id = req.params.id;
    const officerId = req.user.id;
    const remarks = req.body.remarks || "Approved";

    const app = await Application.findApplicationById(id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    if (app.status !== "PENDING") {
      return res.status(400).json({ message: "Already decided" });
    }

    await Application.updateApplicationStatus({
      id,
      status: "APPROVED",
      officerId,
      remarks,
    });

    // update business expiry date on approval
    await Business.updateBusinessExpiry(app.business_id);

    res.json({ message: "Application approved" });
  } catch (err) {
    console.error("approveApplication error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/applications/:id/reject
async function rejectApplication(req, res) {
  try {
    const id = req.params.id;
    const officerId = req.user.id;
    const remarks = req.body.remarks || "Rejected";

    const app = await Application.findApplicationById(id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    if (app.status !== "PENDING") {
      return res.status(400).json({ message: "Already decided" });
    }

    await Application.updateApplicationStatus({
      id,
      status: "REJECTED",
      officerId,
      remarks,
    });

    res.json({ message: "Application rejected" });
  } catch (err) {
    console.error("rejectApplication error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getMyApplications,
  getPendingApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
};
