const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3500;
const okCode = 200;
const notFound = 404;

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (request, response) => { // 1. GET ALL THE TOURS

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

const getTourByID = (request, response) => { // 2. GET A TOUR BY ID
    const id = request.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(id > tours.length || !tour) {
        return response.status(notFound).json({message: 'Tour Not Found'});
    }

    return response.status(okCode).json({
        id,
        data: {
            tour
        }
    })
}

const createTour = (request, response) => { // Creates a new tour 

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

const updateTourByID = (request, response) => {
    const id = request.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(id > tours.length || !tour) {
        return response.status(notFound).json({message: 'Tour Not Found'});
    }

    return response.status(okCode).json({
        message: '<Updated Tour Success>',
        sentAt: new Date().toISOString()
    });
};

const deleteTourByID = (request, response) => {
    return response.status(204).json({
        data: undefined
    })
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTourByID).patch(updateTourByID).delete(deleteTourByID);

// Listen for incoming requests on the specified port
app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})