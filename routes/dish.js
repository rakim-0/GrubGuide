const express = require("express");
const dishRouter = express.Router();
const dishController = require("../controller/dish");

dishRouter
    .post("/api/dish", dishController.createDish)
    .get("/api/dish/:id", dishController.getDishById)
    .get("/api/dish", dishController.getAllDishes)
    .patch("/api/dish", dishController.updateDish);

module.exports = dishRouter;
