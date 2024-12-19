// orders
//     id (primary key, unique identifier for each order)
//     user_id (foreign key referencing the users table)
//     total_price

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Order = sequelize.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99999,
    },

    total_price: {
        type: DataTypes.DOUBLE,
        defaultValue: 99999,
    },
});

module.exports = Order;
