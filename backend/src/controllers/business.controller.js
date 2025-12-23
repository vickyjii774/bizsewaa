// src/controllers/business.controller.js
const Business = require("../models/business.model");
const Application = require("../models/application.model");

// POST /api/business  (Citizen creates new business + NEW_REG application)
async function createBusiness(req, res) {
  try {
    const { businessName, businessType, address, contactNo } = req.body;
    const ownerUserId = req.user.id;

    const business = await Business.createBusiness({
      ownerUserId,
      businessName,
      businessType,
      address,
      contactNo,
    });

    await Application.createApplication({
      businessId: business.id,
      applicantUserId: ownerUserId,
      type: "NEW_REG",
    });

    res.status(201).json({ message: "Application submitted", business });
  } catch (err) {
    console.error("createBusiness error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/business/my
async function getMyBusinesses(req, res) {
  try {
    const businesses = await Business.getBusinessesByOwner(req.user.id);
    res.json(businesses);
  } catch (err) {
    console.error("getMyBusinesses error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/business/:id/renew
async function renewBusiness(req, res) {
  try {
    const businessId = req.params.id;
    const userId = req.user.id;

    const business = await Business.findBusinessById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    if (business.owner_user_id !== userId) {
      return res.status(403).json({ message: "Not your business" });
    }

    await Application.createApplication({
      businessId: business.id,
      applicantUserId: userId,
      type: "RENEWAL",
    });

    res.status(201).json({ message: "Renewal application submitted" });
  } catch (err) {
    console.error("renewBusiness error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createBusiness,
  getMyBusinesses,
  renewBusiness,
};
