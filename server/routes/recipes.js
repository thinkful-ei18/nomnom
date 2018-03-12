'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

/* ========== GET all recipes ========== */

router.get('/recipes', (req, res, next) => {
  let sort = 'created'; // default sorting

  Recipe.find()
    .select()
    .sort(sort)
    .then(Recipes => {
      res.json(Recipes);
    })
    .catch(next);
});

/* ========== GET/READ A SINGLE ITEM ========== */
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

/* ========== POST/CREATE A RECIPE ========== */
router.post('/recipes', (req, res, next) => {
  const {
    title,
    img,
    ingredients,
    instructions,
    prepTime,
    cookTime
  } = req.body;
  //Check if required fields present
  const requiredFields = [
    'title',
    'img',
    'ingredients',
    'instructions',
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

  let obj = { title, img, ingredients, instructions, prepTime, cookTime };

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

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/Recipes/:id', (req, res, next) => {
  // // THIS SETS NOTE RecipeID TO NULL
  //   Recipe
  //     .findByIdAndRemove(req.params.id)
  //     .then(() => {
  //       return  Note
  //         .update({ RecipeId: req.params.id }, { $set: { RecipeId: null } }, {multi: true});
  //     })
  //     .then(() => res.status(204).end())
  //     .catch(next);

  Note.find({ RecipeId: req.params.id, userId: req.user.id })
    .then(res => {
      if (res.length > 0) {
        const err = new Error('Recipe is being used by other notes');
        err.status = 400;
        return next(err);
      }
    })
    .then(() => {
      return Recipe.findByIdAndRemove(req.params.id);
    })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
