const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const imageController = require('../controllers/imageController');

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/images', imageController.getImages);
router.get('/image/:id', imageController.getImageById);

module.exports = router;
