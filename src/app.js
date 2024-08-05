const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('../src/routes/imageRoutes');
const adminRoutes = require('../src/routes/adminRoutes'); 
const authRoutes = require('../src/routes/authRoutes'); 
const session = require("express-session");
const path = require('path');

const app = express();

// Session Configuration
app.use(
    session({
      secret: "galalaga",
      resave: true,
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
