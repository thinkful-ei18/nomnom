'use strict';

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, index: true },
  img: String,
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  prepTime: { type: Number },
  cookTime: { type: Number },
  created: { type: Date, default: Date.now }
});

recipeSchema.index({ title: 'text' });

recipeSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
