const Dish = require("../model/dish");
const { make } = require("simple-body-validator");

exports.createDish = async (req, res) => {
    const rules = {
        name: "required|string",
        rating: "numeric|min:0|max:5",
        image: "string|max:255",
        description: "string",
        availability_time: "required|in:morning,lunch,dinner",
        tags: "required|string",
        price: "required|numeric|min:0",
        rest_id: "required|integer",
        menu_id: "required|integer",
    };
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }
        const validator = make(req.body, rules);
        if (!validator.validate()) {
            res.status(400).json({ "Errors: ": validator.errors().all() });
        } else {
            const newDish = await Dish.create(req.body);
            res.status(201).json(newDish);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDishById = async (req, res) => {
    const rules = {
        id: "required|integer",
    };
    try {
        const validator = make(req.params, rules);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const dish = await Dish.findByPk(req.params.id);
        if (dish) {
            res.json(dish);
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error in getDishById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateDish = async (req, res) => {
    const rules = {
        id: "numeric",
        name: "string",
        rating: "numeric|min:0|max:5",
        image: "string|max:255",
        description: "string",
        availability_time: "in:morning,lunch,dinner",
        tags: "string",
        price: "numeric|min:0",
        rest_id: "integer",
        menu_id: "integer",
    };
    const validator = make(req.body, rules);
    if (!validator.validate()) {
        res.status(400).json({ "Errors: ": validator.errors().all() });
    } else {
        try {
            const [updatedRowsCount, updatedMenus] = await Dish.update(
                req.body,
                {
                    where: { id: req.body.id },
                    returning: true,
                }
            );

            if (updatedRowsCount === 0) {
                return res.status(404).json({ message: "Dish not found" });
            }

            res.json({ msg: "Successfully Updated!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

exports.deleteDishByID = async (req, res) => {
    const rules = {
        id: "required|integer",
    };
    try {
        const validator = make(req.params, rules);
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
            res.json({
                message: `Dish ${req.params.id} has been deleted successfully!`,
            });
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error in getDishById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
