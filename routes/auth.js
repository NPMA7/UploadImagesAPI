const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../utils/db");
const router = express.Router();
const path = require("path");


// Login
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;
        if (match) {
          req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
          };
          res.redirect("/");
        } else {
          res.status(401).send("Invalid credentials");
        }
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// Register
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.status(400).send("Username already taken");
    } else {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err, result) => {
          if (err) throw err;
          res.redirect("/login");
        });
      });
    }
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
