// api/users.js
const db = require('../db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
