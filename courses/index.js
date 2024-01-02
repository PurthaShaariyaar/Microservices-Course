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

// 5. Storing data locally > create a data structure (object) to store all courses (initiall empty)
const courses = {};

/**
 * 6. Route handler endpoint to get all courses
 */
app.get('/courses', (req, res) => {
  res.send(courses);
});

/**
 * 7. Route handler to endpoint to create a new course
 * Calls randomBytes to generate a random id for the new course
 * Extracts the name -> creates a new course object with the generated id & name
 * Send the status with the courses[id]
 */
app.post('/courses', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  courses[id] = {
    id, name
  };

  await axios.post('http://localhost:4005/events', {
    type: 'CourseCreated',
    data: {
      id, name
    }
  });

  res.status(201).send(courses[id]);
});

/**
 * 9. Route handler to post received an event and respond to with a status of ok
 * Respond by 2 paramaters: received event & type via req body
 */
app.post('/events', (req, res) => {
  console.log('Received event.', req.body.type);
});

// 8. Start the server & listen on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
