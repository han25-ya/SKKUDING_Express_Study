const express = require('express');

const restaurantController = require('../controllers/restaurant');

const router = express.Router();

router.get('/', restaurantController.getRestaurants);

router.get('/restaurant/:name', restaurantController.getRestaurantByName);

router.get('/add-restaurant', restaurantController.AddRestaurantPage);

router.delete('/delete-restaurant/:name', restaurantController.deleteRestaurant);

router.post('/add-restaurant', restaurantController.AddRestaurant);

router.patch('/edit-restaurant', restaurantController.editRestaurant);

module.exports = router;