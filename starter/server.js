const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
const app = require('./app');

const port = process.env.PORT || 3500;

// Connect to MongoDB database
const DB_CONNECTION = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then((conn) => {
    console.log('Connected to Database Successfully')
});

const tourSchema = new mongoose.Schema({ // Creates a new tour schema
    name: {
        type: String,
        required: [true, 'A Tour must have a valid name']
    },

    rating: {
        type: Number,
        required: [true, 'A Tour must have a rating associated']
    },

    price: {
        type: Number,
        required: [true, 'A Tour must have a valid price']
    }
});

const Tours = mongoose.model('Tours', tourSchema);

// Listen for incoming requests on the specified port
app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})