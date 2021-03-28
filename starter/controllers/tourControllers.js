const Tour = require('../models/TourModel');
const okCode = 200;
const notFound = 404;

exports.getAllTours = async (request, response) => { // 1. GET ALL THE TOURS

    try {
        const method = request.method;

        if(method === 'GET') {

            const tours = await Tour.find();

            return response.status(okCode).json({
                data: tours,
                length: tours.length,
                sentAt: new Date().toISOString()
            })
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
            })
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
            return response.json({
                message: error.toString()
            });
        }
    }
};

exports.updateTourByID = (request, response) => {

    return response.status(okCode).json({
        message: '<Updated Tour Success>',
        sentAt: new Date().toISOString()
    });
};

exports.deleteTourByID = (request, response) => {

    return response.status(204).json({
        data: undefined
    })
};