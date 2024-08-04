const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./utils/db");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use('/', require('./routes/index'), require('./routes/auth'));
app.use('/images', require('./routes/images'));
app.use('/admin', require('./routes/admin'));
// Endpoint untuk memeriksa koneksi database
app.get('/health-check', async (req, res) => {
  try {
      await db.query('SELECT 1'); // Query sederhana untuk memeriksa koneksi
      res.status(200).send('Database is connected');
  } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
