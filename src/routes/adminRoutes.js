const express = require("express");
const path = require("path");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Route to get user data
router.get("/data/user/json", isAuthenticated, adminController.data);
router.post("/data/user/json", isAuthenticated, adminController.data);

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
