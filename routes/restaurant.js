const express = require("express");
const passport = require("passport");
const restaurantRouter = express.Router();

const restaurantController = require("../controller/restaurant");

restaurantRouter
    .post("/api/restaurant", restaurantController.createRestaurant)
    .get("/api/restaurant/:id", restaurantController.getRestaurantById)
    .get("/api/restaurant", restaurantController.getAllRestaurants)
    .get(
        "/api/restaurant/nearby",
        restaurantController.findAllRestaurantsLessThan10km
    )
    .delete("/api/restaurant/:id", restaurantController.deleteRestaurantById)
    .patch("/api/restaurant", restaurantController.updateRestaurant);
module.exports = restaurantRouter;
