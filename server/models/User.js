var mongoose = require('mongoose');

// Create the UserSchema.
var UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name:{
  	type: String,
  	required: true
  },
  email:{
  	type: String,
  	required: true
  },
  dob:{
  	type: String,
  	required: true
  },
  username:{
  	type: String,
  	required: true
  },
  password:{
  	type: String,
  	required: true
  },
  rating:{
  	type: Number,
    default: 3,
    required: true
  },
  isBanned:{
  	type: Boolean,
  	required: true
  }
});

// Export the model schema.
module.exports = UserSchema;
