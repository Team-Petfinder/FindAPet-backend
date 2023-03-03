'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const petSchema = new Schema({
  name: String,
  type: String,
  description: String,
});


module.exports = mongoose.model('Animal', petSchema);

