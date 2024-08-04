const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

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

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
