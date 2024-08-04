const bcrypt = require('bcryptjs');
const pool = require('../config/db');

exports.login = (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Server error');
            return;
        }
        if (results.rows.length > 0) {
            const user = results.rows[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords', err.stack);
                    res.status(500).send('Server error');
                    return;
                }
                if (match) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    };
                    res.redirect('/');
                } else {
                    res.status(401).send('Invalid credentials');
                }
            });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
};


exports.register = (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Server error');
            return;
        }
        if (results.rows.length > 0) {
            res.status(400).send('Username already taken');
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password', err.stack);
                    res.status(500).send('Server error');
                    return;
                }
                pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPassword, 'visitor'], (err, result) => {
             
                   if (err) {
                        console.error('Error executing query', err.stack);
                        res.status(500).send('Server error');
                        return;
                    }
                    res.redirect('/login');
                });
            });
        }
    });
};


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

