const express = require('express');
const tourController = require('../controllers/tourControllers');
const tourRouter = express.Router();

tourRouter.param('id', (request, response, next, value) => { // Param middleware
    console.log(`Tour id is ${value}`);
    return next();
}); 

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createTour);
tourRouter.route('/:id').get(tourController.getTourByID).patch(tourController.updateTourByID).delete(tourController.deleteTourByID);

module.exports = tourRouter;