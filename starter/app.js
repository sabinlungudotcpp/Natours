const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();

console.log(process.env);
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;