const express = require("express");
const router = express.Router();
const {
  getForms,
  getFormById,
  createForm,
  getFormByUniqueId,
} = require("../Controllers/Form");

router.get("/forms", getForms);
router.get("/forms/:id", getFormById);
router.get("/forms/unique/:uniqueId", getFormByUniqueId);
router.post("/forms", createForm);

module.exports = router;
