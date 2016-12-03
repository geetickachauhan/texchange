var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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
  	required: true,
    unique: true
  },
  password:{
  	type: String,
  	required: true
  },
  rating: [Number],
  loginCount:{
  	type: Number,
    default: 0,
    required: true
  },
  isBanned:{
  	type: Boolean,
  	required: true
  },
  isAdmin:{
  	type: Boolean,
    default: false,
  	required: true
  },
  cart: [String],
  reportCount:{
    type: Number,
    required: true
  }
});

UserSchema.plugin(uniqueValidator);
// Export the model schema.
module.exports = UserSchema;
