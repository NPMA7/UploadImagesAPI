const express = require("express");
const multer = require("multer");
const db = require("../utils/db");
const router = express.Router();



// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Image
router.post("/", upload.single("image"), (req, res) => {
  const { senderName } = req.body;
  const imageData = req.file.buffer;
  db.query("INSERT INTO images (image_data, sender_name) VALUES (?, ?)", [imageData, senderName], (err, result) => {
    if (err) throw err;
    res.sendStatus(201);
  });
});
// Get Images Metadata
router.get("/", (req, res) => {
  db.query("SELECT id, sender_name, upload_date FROM images", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get Image by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT image_data FROM images WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.contentType("image/jpeg"); // Adjust MIME type if necessary
      res.send(results[0].image_data);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete Image
router.delete("/:id", (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    const { id } = req.params;
    db.query("DELETE FROM images WHERE id = ?", [id], (err, results) => {
      if (err) throw err;
      res.sendStatus(204); // No Content
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

module.exports = router;
