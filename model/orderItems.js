// order_items
// id (primary key, unique identifier for each order item)
// cart_id (foreign key referencing the cart table)
// dish_id (foreign key referencing the dishes table)
// quantity
// price_at_purchase (price of the dish when it was added to the cart)
// created_at (timestamp for when the item was added to the cart)
// updated_at (timestamp for when the item was last updated)

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const OrderItems = sequelize.define("OrderItems", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 999999,
    },
});

module.exports = OrderItems;
