const { Sequelize } = require("sequelize");
const Cart = require("../model/cart");
const Dish = require("../model/dish");
const { set } = require("mongoose");
exports.getCartDetails = async (req, res) => {
    try {
        Cart.hasMany(Dish, {
            foreignKey: "id",
            sourceKey: "dishId",
        });
        const cart = await Cart.findAll({
            attributes: ["*"],
            include: [
                {
                    model: Dish,
                    required: true,
                    raw: true,
                },
            ],
            where: { userId: req.params.id },
            raw: true,
            nest: true,
        });
        // console.log(cart);
        // var dishArr = [];
        // for (let i = 0; i < cart.length; i++) {
        //     dishArr.push(cart[i].Dishes[0]);
        // }
        return res.json({ status: true, data: cart });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
exports.addToCart = async (req, res) => {
    /**
     * Check if the dish already exists:
     *      if yes then update the counter
     *      else add it to the list
     */

    // const newCartItem = await Cart.create(req.body);
    try {
        const checkCart = await Cart.findOne({
            where: {
                userId: req.body.userId,
                dishId: req.body.dishId,
            },
        });
        let cart;

        if (!checkCart) {
            cart = await Cart.create(req.body);
        } else {
            let newCount = checkCart.count + (req.body.count || 1);
            if (newCount < 0) {
                newCount = 0;
            }
            // console.log(newCount);
            await Cart.update(
                { count: newCount },
                {
                    where: {
                        userId: req.body.userId,
                        dishId: req.body.dishId,
                    },
                }
            );
            cart = await Cart.findOne({
                where: {
                    userId: req.body.userId,
                    dishId: req.body.dishId,
                },
            });
        }

        return res.json({ status: true, data: cart });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
exports.updateCart = async (req, res) => {
    try {
        if (req.body.count && req.body.count < 0) {
            req.body.count = 0;
        }
        const [updatedRowsCount, updatedCarts] = await Cart.update(req.body, {
            where: {
                userId: req.body.userId,
                dishId: req.body.dishId,
            },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.json({ status: true, data: updatedCarts });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
