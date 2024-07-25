const express = require("express");
const dishRouter = express.Router();
const dishController = require("../controller/dish");

dishRouter
    .post("/api/dish")
    .get("/api/dish/:id", dishController.getDishById)
    .get("/api/dish", dishController.getAllDishes)
    .delete("/api/dish/:id", dishController.deleteDishByID)
    .patch("/api/dish", dishController.updateDish);

module.exports = dishRouter;
