const express = require('express');
const path = require('path');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Get User Data
router.get('/data/user/json', adminController.data);
// Get User Data
router.post('/data/user/json', adminController.data);

// Admin Dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    res.sendFile(path.join(__dirname, '../../public/admin', 'dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

router.get('/forms', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    res.sendFile(path.join(__dirname, '../../public/admin', 'forms.html'));
  } else {
    res.redirect('/login');
  }
});

router.get('/tables', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    res.sendFile(path.join(__dirname, '../../public/admin', 'tables.html'));
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
