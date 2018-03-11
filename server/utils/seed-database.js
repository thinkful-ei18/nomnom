'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { MONGODB_URI } = require('../config');
const Recipe = require('../models/recipe');

const seedRecipes = require('../db/seed/recipes');

mongoose
  .connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(result => {
    console.info(`Dropped Database: ${result}`);
  })
  .then(() => {
    return Promise.all([
      Recipe.insertMany(seedRecipes).then(results => {
        console.info(`Inserted ${results.length} Recipes`);
      }),
      Recipe.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
