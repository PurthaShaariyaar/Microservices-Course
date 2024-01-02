// 1. Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// 2. Create an express application
const app = express();

// 3. Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

/**
 * 4. Route handler to post each event per service to query service
 * Extract the body of the request
 * Each post includes a try catch block
 */
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.messagge);
  });
});

// 5. Start the server and listen on port 4005
app.listen(4005, () => {
  console.log('Listening on port 4005');
});
