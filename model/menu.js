// -- Menu
//     -- type
//     -- rest. id
//     -- menu_type (reserved for customer visit time so we can decide what menu to show)
//     -- gallery_image (mediumText for storing the uploaded restaurant menu)
//     -- rating (set by the customer)
// import { DataTypes } from "sequelize";
// import { Restaurant } from "./restaurant";
// import sequelize from "../db/sequelize-connection";

const DataTypes = require("sequelize");
const Restaurant = require("./restaurant");
const sequelize = require("../db/sequelize-connection");

const Menu = sequelize.define("Menu", {
    rest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    menu_type: {
        type: DataTypes.ENUM("morning", "lunch", "dinner"),
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
    },
    gallery_image: {
        type: DataTypes.STRING(255),
    },
});
module.exports = Menu;
