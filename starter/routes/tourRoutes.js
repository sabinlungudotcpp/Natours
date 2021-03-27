const express = require('express');
const tourController = require('../controllers/tourControllers');
const tourRouter = express.Router();

tourRouter.param('id', tourController.checkID);

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createTour);
tourRouter.route('/:id').get(tourController.getTourByID).patch(tourController.updateTourByID).delete(tourController.deleteTourByID);

module.exports = tourRouter;