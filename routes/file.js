// fileRouter.js
const express = require("express");
const fileRouter = express.Router();
const fileController = require("../controller/file");

// Handle file upload
fileRouter.post(
    "/upload",
    fileController.upload.single("file"),
    fileController.uploadFile
);

module.exports = fileRouter;
