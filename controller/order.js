const { Sequelize } = require("sequelize");
const Order = require("../model/order");

exports.addToOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        return res.json({ status: true, data: order });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
