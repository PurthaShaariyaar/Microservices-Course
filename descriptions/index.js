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

// Storing data locally > create a data structure (object) to store all descriptions (initially empty)
const descriptionsByCourseId = {};

/**
 * Route handler to get all descriptions
 * Either send the entire array with the objects of id & comments or (||) an empty array
 */
app.get('/courses/:id/descriptions', (req, res) => {
  res.send(descriptionsByCourseId[req.params.id] || []);
});

/**
 * Route handler to create a description
 * Calls randomBytes to generate a random id for the new description
 * Extract the description property in the request body
 * Either retrieve all existing descriptions or (||) initilize the descriptions array to be empty
 * Push the new description with id & description to the descriptions array
 * Update the descriptionsByCourseId object with the new descriptions array
 */
app.post('/courses/:id/descriptions', (req, res) => {
  const descriptionId = randomBytes(4).toString('hex');
  const { description } = req.body;

  const descriptions = descriptionsByCourseId[req.params.id] || [];

  descriptions.push({ id: descriptionId, description });

  descriptionsByCourseId[req.params.id] = descriptions;

  res.status(201).send(descriptions);
});

// Start the server & listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001');
});
