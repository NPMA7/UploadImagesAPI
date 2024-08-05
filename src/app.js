const bodyParser = require('body-parser');
const imageRoutes = require('../src/routes/imageRoutes');
const adminRoutes = require('../src/routes/adminRoutes'); 
const authRoutes = require('../src/routes/authRoutes'); 
const session = require("express-session");
const express = require('express');
const path = require('path');
const cors = require("cors")
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();


app.use(cors())
// Middleware for parsing cookies
app.use(cookieParser()); // Cookie secret for signed cookies

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
  resave: false, // Do not save session if unmodified
  saveUninitialized: false, // Do not create a session until something is stored
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    secure: 'production', // Set to true if using HTTPS
    sameSite: 'lax' // Controls when cookies are sent
  }
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Menyajikan file statis dari folder public

app.use('/', authRoutes); 
app.use('/api', imageRoutes);
app.use('/admin', adminRoutes);
module.exports = app;
