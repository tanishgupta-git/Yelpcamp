const express = require('express');
// we are doing this because to access params in this file of the route
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');

const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas.js');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/',validateReview,catchAsync(async (req,res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    const campground  = await Campground.findById(id);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created a new review');
    res.redirect(`/campgrounds/${campground._id}`);
}));
router.delete('/:reviewId',catchAsync(async (req,res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted your review');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;