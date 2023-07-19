const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;
const path=require('path');
const bodyParser = require('body-parser');

// Connection details for ElephantSQL
const connectionString = 'postgres://ykbkdqob:oX3DIjXnklGMR9uTX-PYsU_L1dJc6hhK@hansken.db.elephantsql.com/ykbkdqob';

// Create a new PostgreSQL client
const client = new Client({ connectionString });

// Connect to the database
client.connect();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'frontend')));

// SQL query to create a table
function createTables(){
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS my_table (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER
  )
`;

// Execute the query to create the table
client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');
  }
});
}
createTables();


// Serve the HTML file containing the form
app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, age } = req.body;

  // SQL query to insert data into the table
  const insertDataQuery = `
    INSERT INTO my_table (name, age)
    VALUES ($1, $2)
  `;
  
  const values = [name, age];

  // Execute the query to insert data
  client.query(insertDataQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data into the database');
    } else {
      console.log('Data inserted successfully');
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
