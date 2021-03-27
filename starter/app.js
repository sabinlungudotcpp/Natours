const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3500;
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);


// Listen for incoming requests on the specified port
app.listen(port, (error) => {

    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.error(error.toString());
    }
})