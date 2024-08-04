const pool = require('../config/db');

const uploadImage = async (req, res) => {
  const { sender_name } = req.body;
  const image_data = req.file.buffer;

  try {
    await pool.query(
      'INSERT INTO images (sender_name, image_data) VALUES ($1, $2)',
      [sender_name, image_data]
    );
    res.status(201).send('Image uploaded successfully');
  } catch (err) {
    res.status(500).send('Error uploading image');
  }
};

const getImages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM images ORDER BY upload_date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching images');
  }
};

const getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM images WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.set('Content-Type', 'image/jpeg');
      res.send(result.rows[0].image_data);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM images WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount > 0) {
      res.status(200).send('Image deleted successfully');
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting image');
  }
};


module.exports = {
  uploadImage,
  deleteImage,
  getImages,
  getImageById
};
