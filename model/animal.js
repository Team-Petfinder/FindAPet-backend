'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const petSchema = new Schema({
  name: String,
  type: String,
  gender: String,
  size: String,
  link: String,
  email: String,
});


module.exports = mongoose.model('Animal', petSchema);

