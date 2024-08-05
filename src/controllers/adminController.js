const pool = require('../config/db');

// Admin Dashboard
exports.dashboard = (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    pool.query("SELECT id, sender_name, upload_date FROM images", (err, results) => {
      if (err) throw err;
      res.json(results); // Kirim data dalam format JSON
    });
  } else {
    res.redirect("/login");
  }
};

exports.forms = (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    pool.query("SELECT id, sender_name, upload_date FROM images", (err, results) => {
      if (err) throw err;
      res.json(results); // Kirim data dalam format JSON
    });
  } else {
    res.redirect("/login");
  }
};

exports.tables = (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    pool.query("SELECT id, sender_name, upload_date FROM images", (err, results) => {
      if (err) throw err;
      res.json(results); // Kirim data dalam format JSON
    });
  } else {
    res.redirect("/login");
  }
};

