const { Sequelize } = require("sequelize");
const Cart = require("../model/cart");
const Dish = require("../model/dish");
exports.getCartDetails = async (req, res) => {
    try {
        Cart.hasMany(Dish, {
            foreignKey: "id",
            sourceKey: "dishId",
        });
        const cart = await Cart.findAll({
            attributes: ["*", "Cart.*"],
            include: [
                {
                    model: Dish,
                    required: true,
                },
            ],
            where: { userId: req.params.userId },
        });
        return res.json({ status: true, data: cart });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
exports.addToCart = async (req, res) => {
    const newCartItem = await Cart.create(req.body);
    return res.status(201).json(newCartItem);
};
exports.updateCart = async (req, res) => {
    const [updatedRowsCount, updatedMenus] = await Cart.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    });

    if (updatedRowsCount === 0) {
        return res.status(404).json({ message: "Menu not found" });
    }

    return res.json({ msg: "Successfully Updated!" });
};
