const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const imageController = require('../controllers/imageController');
const db = require('../config/db'); // Impor konfigurasi database

// Endpoint lain
router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/images', imageController.getImages);
router.get('/image/:id', imageController.getImageById);
router.delete('/image/:id', imageController.deleteImage); // Tambahkan route delete

// Endpoint untuk memeriksa koneksi database
router.get('/health-check', async (req, res) => {
    try {
        await db.query('SELECT 1'); // Query sederhana untuk memeriksa koneksi
        res.status(200).send('Database is connected');
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection error');
    }
});

module.exports = router;
