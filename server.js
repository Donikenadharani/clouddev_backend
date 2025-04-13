const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Local MySQL connection config
// triggering azure deployment

const db = mysql.createConnection({
  host: 'assignmentdemo2.mysql.database.azure.com',
  user: 'mysql_admin',
  password: 'Dharani@6122', // Use environment variable for sensitive information
  database: 'studentdb',
  port: 3306,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log('Backend running on http://localhost:${PORT}'));
