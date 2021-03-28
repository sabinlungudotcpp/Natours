const fs = require('fs');
const Tour = require('../../models/TourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const DB_CONNECTION = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database Successfully')
});

// Read JSON file
const tours = fs.readFileSync('tours-simple.json', 'utf-8');