var mongoose = require('mongoose');

// Create the BookSchema.
var BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  edition: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  num_pages: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  cover_type: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    ref: 'user',
    required: true
  },
  buyer: {
    type: String,
    ref: 'user'
  }
});

// Export the model schema.
module.exports = BookSchema;
