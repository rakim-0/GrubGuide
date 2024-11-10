const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();
userRouter.get("/api/user/:id", userController.getUser);
userRouter.post("/api/user/", userController.createUser);
