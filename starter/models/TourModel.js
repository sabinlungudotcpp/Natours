const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({ // Creates a new tour schema

    name: {
        type: String,
        required: [true, 'A Tour must have a valid name'],
        unique: true
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

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;