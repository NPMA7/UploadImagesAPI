const bodyParser = require('body-parser');
const imageRoutes = require('../src/routes/imageRoutes');
const adminRoutes = require('../src/routes/adminRoutes'); 
const authRoutes = require('../src/routes/authRoutes'); 
const session = require("express-session");
const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();

// Konfigurasi session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Menyajikan file statis dari folder public

app.use('/', authRoutes); 
app.use('/api', imageRoutes);
app.use('/admin', adminRoutes);
module.exports = app;
