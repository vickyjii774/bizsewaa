// src/routes/application.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");
const applicationController = require("../controllers/application.controller");

// Citizen
router.get(
  "/my",
  auth,
  allowRoles("CITIZEN"),
  applicationController.getMyApplications
);

// Officer
router.get(
  "/pending",
  auth,
  allowRoles("OFFICER"),
  applicationController.getPendingApplications
);

// Common (citizen/officer/admin) – you can relax role check if needed
router.get("/:id", auth, applicationController.getApplicationById);

// Officer
router.put(
  "/:id/approve",
  auth,
  allowRoles("OFFICER"),
  applicationController.approveApplication
);

router.put(
  "/:id/reject",
  auth,
  allowRoles("OFFICER"),
  applicationController.rejectApplication
);

module.exports = router;
