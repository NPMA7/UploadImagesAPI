const express = require('express');
const path = require('path');
const adminController = require('../controllers/adminController');

const router = express.Router();



// Endpoint untuk mengirimkan data user
router.get('/data/user/json', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
      res.json({
        role: req.session.user.role,
        username: req.session.user.username,
      });
    } else {
      res.sendStatus(401); // Unauthorized jika user bukan admin
    }
  });

// Admin Dashboard
router.get("/dashboard", (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
      res.sendFile(path.join(__dirname, "../../public/admin", "dashboard.html"));
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/forms", (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
      res.sendFile(path.join(__dirname, "../../public/admin", "forms.html"));
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/tables", (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
      res.sendFile(path.join(__dirname, "../../public/admin", "tables.html"));
    } else {
      res.redirect("/login");
    }
  });
  
  module.exports = router;
  