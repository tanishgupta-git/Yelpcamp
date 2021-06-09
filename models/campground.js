const monogoose = require('mongoose');
const Schema = monogoose.Schema;

const CampgroundSchema = new Schema({
  title : String,
  image: String, 
  price : Number,
  description : String,
  location : String
});

module.exports = monogoose.model('Campground',CampgroundSchema);