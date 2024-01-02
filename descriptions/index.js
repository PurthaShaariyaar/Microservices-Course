// 1. Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// 2. Create an express application
const app = express();

// 3. Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// 4. Bypass CORS error
app.use(cors());

// 5. Storing data locally > create a data structure (object) to store all descriptions (initially empty)
const descriptionsByCourseId = {};

/**
 * 6. Route handler to get all descriptions
 * Either send the entire array with the objects of id & comments or (||) an empty array
 */
app.get('/courses/:id/descriptions', (req, res) => {
  res.send(descriptionsByCourseId[req.params.id] || []);
});

/**
 * 7. Route handler to create a description
 * Calls randomBytes to generate a random id for the new description
 * Extract the description property in the request body
 * Either retrieve all existing descriptions or (||) initilize the descriptions array to be empty
 * Push the new description with id & description to the descriptions array
 * Update the descriptionsByCourseId object with the new descriptions array
 */
app.post('/courses/:id/descriptions', async (req, res) => {
  const descriptionId = randomBytes(4).toString('hex');
  const { description } = req.body;

  const descriptions = descriptionsByCourseId[req.params.id] || [];

  descriptions.push({ id: descriptionId, description });

  descriptionsByCourseId[req.params.id] = descriptions;

  await axios.post('http://localhost:4005/events', {
    type: 'DescriptionCreated',
    data: {
      id: descriptionId,
      description,
      courseId: req.params.id
    }
  });

  res.status(201).send(descriptions);
});

/**
 * 9. Route handler to post received an event and respond to with a status of ok
 * Respond by 2 parameters: received event & type via req body
 */
app.post('/events', (req, res) => {
  console.log('Received event.', req.body.type);
});

// 8. Start the server & listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001');
});
