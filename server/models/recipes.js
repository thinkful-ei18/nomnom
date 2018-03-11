'use strict';

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, index: true },
  img: String,
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  prepTime: { type: Number },
  cookTime: { type: Number },
  created: { type: Date, default: Date.now }
});

noteSchema.index({ title: 'text' });

noteSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
