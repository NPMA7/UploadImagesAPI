const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('../src/routes/imageRoutes');
const authRoutes = require('../src/routes/authRoutes'); // Mengimpor authRoutes
const session = require("express-session");
const path = require('path');

const app = express();

// Session Configuration
app.use(
    session({
      secret: "galalaga",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Menyajikan file statis dari folder public
app.use('/src', express.static(path.join(__dirname, '../src'))); // Menyajikan folder 'src' sebagai direktori statis

app.use('/api', imageRoutes);
app.use('/', authRoutes); // Menggunakan authRoutes
app.use('/admin', require('../src/controllers/adminController'));
module.exports = app;
