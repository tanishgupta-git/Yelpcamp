require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const monogoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

monogoose.connect(process.env.MONGODB_URI,
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const db = monogoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database Connected");
})
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride('_method'));

app.get('/',(req,res) => {
   res.render('home');
});

app.get('/campgrounds',async (req,res) => {
   const campgrounds = await Campground.find({});
   res.render('campgrounds/index',{ campgrounds : campgrounds});
})
app.get('/campgrounds/new',(req,res) => {
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id',async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{ campground : campground});
 })
app.post('/campgrounds',async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})
app.get('/campgrounds/:id/edit',async (req,res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit',{ campground})
});
app.put('/campgrounds/:id',async (req,res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
})
app.delete('/campgrounds/:id',async (req,res) => {
   const { id } = req.params;
   await Campground.findByIdAndDelete(id);
   res.redirect('/campgrounds');
});
app.listen(5000,() => {
    console.log("Serving On Port 5000");
})