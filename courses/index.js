// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS error
app.use(cors());

// Storing data locally > create a data structure (object) to store all courses (initiall empty)
const courses = {};

/**
 * Route handler endpoint to get all courses
 */
app.get('/courses', (req, res) => {
  res.send(courses);
});

/**
 * Route handler to endpoint to create a new course
 * Calls randomBytes to generate a random id for the new course
 * Extracts the name -> creates a new course object with the generated id & name
 */
app.post('/courses', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  courses[id] = {
    id, name
  };

  res.status(201).send(courses[id]);
});

// Start the server & listen on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
