var mongoose = require('mongoose');

// Create the MovieSchema.
var sendAdminMessageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Export the model schema.
module.exports = sendAdminMessageSchema;
