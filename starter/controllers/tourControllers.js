const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const okCode = 200;
const notFound = 404;

exports.checkID = (request, response, next, value) => {
    if(request.params.id * 1 > tours.length) {

        return response.status(notFound).json({
            status: 'Fail',
            message: `The ID ${value} is invalid`
        })
    }

    return next();
}

exports.checkBody = (request, response, next) => {

    if(!request.body.name || !request.body.price) {
        return response.status(400).json({message: 'Tour title and price must be present in the body'});
    }

     next();
};

exports.getAllTours = (request, response) => { // 1. GET ALL THE TOURS

    try {
        const method = request.method;

        if(method === 'GET') {
            return response.status(okCode).json({
                numberOfTours: tours.length,
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

exports.getTourByID = (request, response) => { // 2. GET A TOUR BY ID
    const id = request.params.id * 1;
    const tour = tours.find(el => el.id === id);

    return response.status(okCode).json({
        id,
        data: {
            tour
        }
    })
}

exports.createTour = (request, response) => { // Creates a new tour 

    try {
        const newId = tours[tours.length - 1].id + 1; // Get the last tour
        const newTour = Object.assign({id: newId}, request.body);
        tours.push(newTour);

        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (error) => {
            return response.status(201).json({
                status: 'Success',
                data: {
                    tour: newTour
                }
            })
        });
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