const express = require("express");
const passport = require("passport");
const restaurantRouter = express.Router();

const restaurantController = require("../controller/restaurant");

restaurantRouter
    .post("/api/restaurant", restaurantController.createRestaurant)
    .get("/api/restaurant/:id", restaurantController.getRestaurantById)
    .get(
        "/api/restaurant",
        (req, res, next) => {
            if (res.locals.currentUser && res.locals.currentUser.role == 0) {
                return next();
            }
            if (req.user) {
                return next();
            }
            return res.json({ error: "NOT AUTHORIZED" });
        },
        restaurantController.getAllRestaurants
    )
    .delete("/api/restaurant/:id", restaurantController.deleteRestaurantById)
    .patch("/api/restaurant", restaurantController.updateRestaurant);
module.exports = restaurantRouter;
