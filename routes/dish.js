const express = require("express");
const dishRouter = express.Router();
const dishController = require("../controller/dish");

dishRouter
    .post("/api/dish", dishController.createDish)
    .get("/api/dish/:id", dishController.getDishById)
    .get("/api/dish", dishController.getAllDishes)
    .get("/api/dish-rest", dishController.getDishesWithRestaurants)
    .get("/api/dish-rest/:id", dishController.getDishesWithRestaurantsById)
    .delete("/api/dish/:id", dishController.deleteDishByID)
    .patch("/api/dish", dishController.updateDish);

module.exports = dishRouter;
