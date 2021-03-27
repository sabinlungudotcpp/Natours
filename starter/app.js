const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3500;
const okCode = 200;
const notFound = 404;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (request, response) => { // 1. GET ALL THE TOURS
    try {
        const method = request.method;

        if(method === 'GET') {
            return response.status(okCode).json({
                numberOfTours: tours.length,
                data: tours,
                
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

app.post('/api/v1/tours', (request, response) => {
    console.log(request.body);
    return response.send('Done');
})

app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})