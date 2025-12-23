// src/routes/business.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");
const businessController = require("../controllers/business.controller");

// Citizen only
router.post(
  "/",
  auth,
  allowRoles("CITIZEN"),
  businessController.createBusiness
);

router.get(
  "/my",
  auth,
  allowRoles("CITIZEN"),
  businessController.getMyBusinesses
);

router.post(
  "/:id/renew",
  auth,
  allowRoles("CITIZEN"),
  businessController.renewBusiness
);

module.exports = router;
