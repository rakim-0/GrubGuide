const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/order");

orderRouter.post("/api/order/:id", orderController.addToOrder);

module.exports = orderRouter;
