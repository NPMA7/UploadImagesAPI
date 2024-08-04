const express = require("express");
const path = require("path");
const pool = require('../config/db');
const router = express.Router();

// Admin Dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    pool.query("SELECT id, sender_name, upload_date FROM images", (err, results) => {
      if (err) throw err;
      res.sendFile(path.join(__dirname, "../../public/admin/", "dashboard.html"));
    });
  } else {
    res.redirect("/login");
  }
});

// Get User Data
router.get("/data", (req, res) => {
  if (req.session.user) {
    res.json({
      role: req.session.user.role,
      username: req.session.user.username,
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

module.exports = router;