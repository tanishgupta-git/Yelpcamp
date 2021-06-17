const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
   body : String,
   rating : Number
});

module.exports = mongoose.model('Review',reviewSchema);