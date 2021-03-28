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
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

// Import data from the file to the database

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully loaded')
    } 
    
    catch(error) {
        if(error) {
            return console.log(error);
        }
    }
};

const deleteData = async () => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return console.log(error);
        }
    }
}