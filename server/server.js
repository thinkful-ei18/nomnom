'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
passport.use(localStrategy);
passport.use(jwtStrategy);

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');

const { PORT, MONGODB_URI, CLIENT_ORIGIN, JWT_SECRET } = require('./config');

// Log all requests. Skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);

// CORS ACCESS
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount router on "/api"
app.use('/api', usersRouter);
app.use('/api', authRouter);

// Endpoints below this require a valid JWT
app.use(passport.authenticate('jwt', { session: false, failWithError: true }));

// Mount router on "/api"
app.use('/api', recipesRouter);

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
