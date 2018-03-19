'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

/* ========== GET all recipes from specific user ========== */

router.get('/recipes/user/:username', (req, res, next) => {
  let filter = { username: req.params.username };
  let sort = 'created'; // default sorting

  Recipe.find(filter)
    .select()
    .sort(sort)
    .then(Recipes => {
      res.json(Recipes);
    })
    .catch(next);
});

/* ========== GET a single recipe ========== */
router.get('/recipes/:id', (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const err = new Error(`${req.params.id} is not a valid ID`);
    err.status = 400;
    return next(err);
  }

  Recipe.findOne({ _id: id })
    .select()
    .then(Recipes => {
      if (Recipes) {
        res.json(Recipes);
      } else {
        const err = new Error(`${req.params.id} is not a valid ID`);
        err.status = 404;
        return next(err);
      }
    })
    .catch(next);
});

/* ========== SEARCH RECIPES ========== */
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  let filter = {};
  let projection = {};
  let sort = 'created';

  if (searchTerm) {
    filter.$text = { $search: searchTerm };
    projection.score = { $meta: 'textScore' };
    sort = projection;
  }

  Recipe.find(filter, projection)
    .select(['title', 'prepTime', 'cookTime', 'image', 'username'])
    .sort(sort)
    .then(notes => {
      res.json(notes);
    })
    .catch(next);
});

module.exports = router;
