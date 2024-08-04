const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

// Login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'login.html'));
});

router.post('/login', authController.login);

// Register
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'register.html'));
});

router.post('/register', authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
