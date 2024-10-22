const Dish = require("../model/dish");
const Restaurant = require("../model/restaurant");

const { make } = require("simple-body-validator");
const { creationRule, updationRule } = require("./rules/dish");
// TODO: Cleanup
exports.createDish = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }
        const validator = make(req.body, creationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const newDish = await Dish.create(req.body);
        return res.status(201).json(newDish);
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ message: error.message });
    }
};

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        return res.json({ status: true, data: dishes });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

exports.getDishById = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const dish = await Dish.findByPk(req.params.id);
        if (dish) {
            return res.json(dish);
        }
        return res.status(404).json({ message: "Dish not found" });
    } catch (error) {
        console.error("Error in getDishById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateDish = async (req, res) => {
    const validator = make(req.body, updationRule);
    if (!validator.validate()) {
        res.status(400).json({ "Errors: ": validator.errors().all() });
    }
    try {
        const [updatedRowsCount, updatedMenus] = await Dish.update(req.body, {
            where: { id: req.body.id },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Dish not found" });
        }
        return res.json({ msg: "Successfully Updated!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDishByID = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const dish = await Dish.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (dish) {
            return res.json({
                message: `Dish ${req.params.id} has been deleted successfully!`,
            });
        }
        return res.status(404).json({ message: "Dish not found" });
    } catch (error) {
        console.error("Error in getDishById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getDishesWithRestaurantsById = async (req, res) => {
    try {
        Dish.belongsTo(Restaurant, {
            foreignKey: "id",
            sourceKey: "rest_id",
        });
        const dishes = await Dish.findAll({
            include: {
                model: Restaurant,
                attributes: ["name"],
            },
            where: {
                id: req.params.id,
            },
            returning: true,
        });
        return res.json({ status: true, data: dishes });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
