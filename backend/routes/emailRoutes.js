const express = require("express");
const router = express.Router();
const { addEmails, getTopEmails } = require("../controllers/emailController");

router.post("/emails", addEmails);
router.get("/emails/top", getTopEmails);

module.exports = router;
