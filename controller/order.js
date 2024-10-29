require("dotenv").config();

const { Sequelize, where } = require("sequelize");
const Order = require("../model/order");
const OrderItem = require("../model/orderItem");
const DishController = require("../controller/dish.js");

exports.addToOrder = async (req, res) => {
    /*
        input: userId, dishId
        output: two new rows should be added to Order and orderItems
        first 
    */
    const userId = req.body["userId"];
    const dishId = req.body["dishId"];

    let order = await Order.findOne({
        where: {
            userId: userId,
        },
    });

    if (!order) {
        order = await Order.create({
            userId: userId,
        });
    }
    console.log(order.get({ plain: true }));
    const orderId = order.id;

    const response = await fetch(`${process.env.API_BASE_URL}/api/dish/${dishId}`);
    const dish = await response.json();
    // let item = null;
    const item = await OrderItem.create({
        orderId: orderId,
        dishId: dishId,
        quantity: 1,
        priceAtPurchase: dish.price,
    });
    if (item) {
        return res.json(item);
    } else {
        return res.json({ err: "error", dish: dish });
    }
};
