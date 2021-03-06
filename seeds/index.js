const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://tanish_gupta:dkJtG95GLIKNIgl5@cluster0.grt5j.mongodb.net/yelpcamp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 ) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author:'60d1c8d4e6344c4610555e40',
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cum, cupiditate veritatis dolores molestiae amet ullam aliquam tenetur quos. Consequatur neque repellendus recusandae eum fuga laborum doloribus ratione, aperiam odio?',
            price,
            geometry:
             {
                  type: 'Point', 
                  coordinates: [
                      cities[random1000].longitude,
                      cities[random1000].latitude
                  ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/yelpcamptan/image/upload/v1624610796/Yelpcamp/tcghklpqcbufzhsalm4y.jpg',
                  filename: 'Yelpcamp/tcghklpqcbufzhsalm4y'
                },
                {
                  url: 'https://res.cloudinary.com/yelpcamptan/image/upload/v1624610796/Yelpcamp/gezr7zqiqyw1onx4ud6r.jpg',
                  filename: 'Yelpcamp/gezr7zqiqyw1onx4ud6r'
                }
            ]            

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})