const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3500;
const okCode = 200;
const notFound = 404;

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (request, response) => { // 1. GET ALL THE TOURS
    try {
        const method = request.method;

        if(method === 'GET') {
            return response.status(okCode).json({
                tours,
                numberOfTours: tours.length
            });
        }
    } 
    
    catch(error) {

        if(error) {
            return response.status(notFound).json({
                message: error.toString()
            })
        }
    }
});

app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})