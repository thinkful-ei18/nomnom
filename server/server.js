'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { PORT, MONGODB_URI } = require('./config');

const recipesRouter = require('./routes/recipes');

// Create an Express application

// Log all requests. Skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount router on "/api"
app.use('/v3', recipesRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function(err, req, res, next) {
  console.log(err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Connect to DB and Listen for incoming connections
if (require.main === module) {
  mongoose
    .connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(
        `Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
      );
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error('\n === Did you remember to start `mongod`? === \n');
      console.error(err);
    });

  app
    .listen(PORT, function() {
      console.info(`Server listening on ${this.address().port}`);
    })
    .on('error', err => {
      console.error(err);
    });
}

module.exports = app; //Export fo testing
