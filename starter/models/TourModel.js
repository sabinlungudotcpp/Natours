const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({ // Creates a new tour schema

    name: {
        type: String,
        required: [true, 'A Tour must have a valid name'],
        unique: true
    },

    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },

    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a max group size']
    },

    rating: {
        type: Number,
        required: [true, 'A Tour must have a rating associated']
    },

    difficulty: {
        type: String,
        required: [true, 'A Tour must have a difficulty']
    },

    ratingsAverage: {
        type: Number,
        default: 4.5
    },

    ratingsQuantity: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        required: [true, 'A Tour must have a valid price']
    },

    priceDiscount: Number,

    summary: {
        type: String,
        trim: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;