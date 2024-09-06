const Cart = require("../model/cart");

exports.getCartDetails = async (req, res) => {
    try {
        const cart = await Cart.findAll();
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
        where: { id: req.body.id },
        returning: true,
    });

    if (updatedRowsCount === 0) {
        return res.status(404).json({ message: "Menu not found" });
    }

    return res.json({ msg: "Successfully Updated!" });
};
