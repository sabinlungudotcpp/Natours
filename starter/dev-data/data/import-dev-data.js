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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully loaded');
        process.exit(1);
    } 
    
    catch(error) {
        if(error) {
            return console.log(error);
        }
    }
};

// Deletes the data from the database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted from the database');
        process.exit(1);
    } 
    
    catch(error) {

        if(error) {
            return console.log(error);
        }
    }
}

if(process.argv[2] === '--import') {
    importData();
}

else if(process.argv[2] === '--delete') {
    deleteData();
}