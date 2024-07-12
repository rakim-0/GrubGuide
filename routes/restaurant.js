const express = require("express");
const restaurantRouter = express.Router();

const restaurantController = require("../controller/restaurant");

restaurantRouter
    .post("/api/restaurant", restaurantController.createRestaurant)
    .get("/api/restaurant/:id", restaurantController.getRestaurantById)
    .get("/api/restaurant", restaurantController.getAllRestaurants)
    .patch("/api/restaurant", restaurantController.updateRestaurant);
module.exports = restaurantRouter;
