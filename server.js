const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'myassignment.mysql.database.azure.com',
  user: 'mysql_admin',
  password: 'Dharani@6122',
  database: 'studentdb',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to get all student details
app.get('/api/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching student data:', err);
      return res.status(500).send('An error occurred while retrieving student data.');
    }
    res.json(results);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}/api/students`);
});
