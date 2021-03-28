const Tour = require('../models/TourModel');
const okCode = 200;
const noContent = 204;
const badRequest = 400;
const notFound = 404;

exports.getAllTours = async (request, response) => { // 1. GET ALL THE TOURS

    try {
        const method = request.method;
        const queryObject = {...request.query}; // Take all of the fields out of the object
        const excludedFields = ['page', 'sort', 'limit', 'fields']; // Fields to exclude

        excludedFields.forEach(val => delete queryObject[val]); // For every value in the array, delete them

        if(method === 'GET') {

            // 2. Advanced Filtering
            let queryString = JSON.stringify(queryObject);
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`) // Replace with the specified operations in regex.
            console.log(JSON.parse(queryString));

            const tours = await Tour.find(queryObject); // Find all the tours with the query object passed in

            return response.status(okCode).json({
                data: tours,
                numberOfTours: tours.length,
                sentAt: new Date().toISOString()
            });
        }
       
    } 
    
    catch(error) {

        if(error) {

            return response.status(notFound).json({
                message: error.toString()
            });
        }
    }
}

exports.getTourByID = async (request, response) => { // 2. GET A TOUR BY ID

    try {
        const method = request.method;

        if(method === 'GET') {

            const tours = await Tour.findById(request.params.id);

            return response.status(okCode).json({
                data: tours
            });

        }
    } 
    
    catch(error) {

        if(error) {
            return response.status(notFound).json({
                message: error.toString()
            });

        }
    }
}

exports.createTour = async (request, response) => { // Creates a new tour 

    try {
        const method = request.method;
        const body = request.body;

        if(method === 'POST') {

            const newTour = await Tour.create(body);
            await newTour.save();

            return response.status(201).json({data: newTour})

        }
    } 
    
    catch(error) {

        if(error) {
            return response.status(badRequest).json({
                status: 'Fail',
                message: error.toString()
            });
        }
    }
};

exports.updateTourByID = async (request, response) => { // Middleware controller function to update a tour given a param id

    try {
        const id = request.params.id;
        const body = request.body;

        if(request.method === 'PATCH') {
            const updatedTour = await Tour.findByIdAndUpdate(id, body, {new: true, runValidators: true});

            return response.status(okCode).json({
                updatedTour,
                updatedAt: new Date().toISOString()
            })
        }

        return response.status(okCode).json({
            message: '<Updated Tour Success>',
            sentAt: new Date().toISOString()
        });
    } 
    
    catch(error) {
        if(error) {
            return response.status(badRequest).json({message: 'Failed to update tour', errorMsg: error.toString()})
        }
    }
};

exports.deleteTourByID = async (request, response) => {

    try {

        const method = request.method;

        if(method === 'DELETE') {
            await Tour.findByIdAndDelete(request.params.id);

            return response.status(noContent).json({
                data: undefined
            });
        }
    } 
    
    catch(error) {
        if(error) {
            return response.status(badRequest).json({message: 'Failed to delete tour', errorMsg: error.toString()})
        }
    }
};