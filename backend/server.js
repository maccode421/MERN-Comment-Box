const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// create our instances
const app = express();
const router = express.Router();

// db config -- set your URI from mLab in keys.js
const db = require('./keys').dbURI;

// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Use our router configuration when we call /api
app.use('/api', router);

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));