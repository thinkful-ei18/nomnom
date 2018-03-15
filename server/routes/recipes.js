'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

/* ========== GET all recipes ========== */

router.get('/recipes', (req, res, next) => {
  let filter = { userId: req.user.id };
  let sort = 'created'; // default sorting

  Recipe.find(filter)
    .select()
    .sort(sort)
    .then(Recipes => {
      res.json(Recipes);
    })
    .catch(next);
});

/* ========== POST/CREATE A RECIPE ========== */
router.post('/recipes', (req, res, next) => {
  const userId = req.user.id;
  const username = req.user.username;
  const {
    title,
    image,
    ingredients,
    directions,
    prepTime,
    cookTime
  } = req.body;
  //Check if required fields present
  const requiredFields = [
    'title',
    'image',
    'ingredients',
    'directions',
    'prepTime',
    'cookTime'
  ];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const err = new Error(`Missing \`${field}\` in request body`);
      err.status = 400;
      return next(err);
    }
  }

  let obj = {
    title,
    image,
    ingredients,
    directions,
    prepTime,
    cookTime,
    userId,
    username
  };

  Recipe.create(obj)
    .then(Recipe =>
      res
        .status(201)
        .location(`${req.originalUrl}${Recipe.id}`)
        .json(Recipe)
    )
    .catch(next);
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/Recipes/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const err = new Error(`${req.params.id} is not a valid ID`);
    err.status = 400;
    return next(err);
  }

  if (req.params.id !== req.body.id) {
    const err = new Error('Params id and body id must match');
    err.status = 400;
    return next(err);
  }

  if (!req.body.name) {
    const err = new Error('Name must be present in body');
    err.status = 400;
    return next(err);
  }
  const toUpdate = {
    name: req.body.name
  };

  Recipe.findOneAndUpdate({ _id: id, userId }, toUpdate, { new: true })
    .then(Recipe => res.json(Recipe))
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The Recipe name already exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE RECIPE ========== */
router.delete('/recipes/:id', (req, res, next) => {
  let _id = req.params.id;
  let userId = req.user.id;

  Recipe.findOne({ _id, userId })
    .then(res => {
      if (res) {
        Recipe.findByIdAndRemove(req.params.id).then(() =>
          res.status(204).end()
        );
      }
    })
    .catch(next);
});

module.exports = router;
