const monogoose = require('mongoose');
const Schema = monogoose.Schema;
const Review = require('./review')

const ImageSchema = new Schema({
  url: String,
  filename: String
});

// we are doing this becuase whenever we call img.thumbnail it will replace it in url
ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
  title : String,
  images: [ImageSchema], 
  price : Number,
  description : String,
  location : String,
  author : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
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