// -- Dishes
//     -- Id
//     -- Rest. ID
//     -- Name
//     -- Tags (Text)
//     -- Price
//     -- availability_time
//     -- description
//     -- image
//     -- rating

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Restaurant = require("./restaurant");
const Menu = require("./menu");

const Dish = sequelize.define("Dish", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNULL: false,
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
    },
    image: {
        type: DataTypes.STRING(255),
    },
    description: {
        type: DataTypes.TEXT,
    },
    availability_time: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["morning", "lunch", "dinner"],
    },
    tags: {
        type: DataTypes.TEXT,
        allowNULL: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNULL: false,
    },
    rest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Dish;
