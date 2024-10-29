// order_items
// id (primary key, unique identifier for each order item)
// orderId (foreign key referencing the cart table)
// dishId (foreign key referencing the dishes table)
// quantity
// priceAtPurchase (price of the dish when it was added to the cart)

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const OrderItem = sequelize.define("OrderItems", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999999,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999999,
    },
    priceAtPurchase: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 999999,
    },
});

module.exports = OrderItem;
