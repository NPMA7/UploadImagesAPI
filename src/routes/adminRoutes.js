const express = require("express");
const path = require("path");
const adminController = require("../controllers/adminController");

const router = express.Router();


// Endpoint for sending user data
router.get("/data/user/json", (req, res) => {
    if (req.session.user) {
      res.json({
        id: req.session.user.id,
        username: req.session.user.username,
        role: req.session.user.role,
      });
    } else {
      res.json({
        id: null,
        username: "visitor",
        role: "visitor",
      });
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
