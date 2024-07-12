const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controller/menu");
menuRouter
    .post("/api/menu", menuController.createMenu)
    .get("/api/menu/:id", menuController.getMenuById)
    .get("/api/menu", menuController.getAllMenus)
    .patch("/api/menu/", menuController.updateMenu);

module.exports = menuRouter;
