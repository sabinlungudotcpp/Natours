const express = require('express');
const userController = require('../controllers/userControllers');
const userRouter = express.Router();

userRouter.route('/').get(userController.getAllUsers).post(userController.createUser);
userRouter.route('/:id').get(userController.getUserByID).patch(userController.updateUserByID).delete(userController.deleteUserByID);

module.exports = userRouter;