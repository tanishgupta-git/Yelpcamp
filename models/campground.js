const monogoose = require('mongoose');
const Schema = monogoose.Schema;
const Review = require('./review')

const CampgroundSchema = new Schema({
  title : String,
  image: String, 
  price : Number,
  description : String,
  location : String,
  reviews : [
    {
      type:Schema.Types.ObjectId,
      ref : 'Review'
    }
  ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Review.deleteMany({
          _id: {
              $in: doc.reviews
          }
      })
  }
})
module.exports = monogoose.model('Campground',CampgroundSchema);