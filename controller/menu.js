// menuController.js
const Menu = require("../model/menu");
const { make } = require("simple-body-validator");

exports.createMenu = async (req, res) => {
    const rules = {
        rest_id: "required|integer",
        menu_type: "required|in:morning,lunch,dinner",
        rating: "numeric",
        gallery_image: "string|max:255",
    };
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }
        const validator = make(req.body, rules);
        if (!validator.validate()) {
            res.status(400).json({ "Errors: ": validator.errors().all() });
        } else {
            const newMenu = await Menu.create(req.body);
            res.status(201).json(newMenu);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMenu = async (req, res) => {
    const rules = {
        rest_id: "integer",
        id: "required|integer",
        menu_type: "in:morning,lunch,dinner",
        rating: "numeric",
        gallery_image: "string|max:255",
    };
    const validator = make(req.body, rules);
    if (!validator.validate()) {
        res.status(400).json({ "Errors: ": validator.errors().all() });
    } else {
        try {
            const [updatedRowsCount, updatedMenus] = await Menu.update(
                req.body,
                {
                    where: { id: req.body.id },
                    returning: true,
                }
            );

            if (updatedRowsCount === 0) {
                return res.status(404).json({ message: "Menu not found" });
            }

            res.json({ msg: "Successfully Updated!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.getMenuById = async (req, res) => {
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

        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ message: "Menu not found" });
        }
    } catch (error) {
        console.error("Error in getMenuById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteMenuById = async (req, res) => {
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

        const menu = await Menu.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (menu) {
            res.json({
                message: `Menu ${req.params.id} has been deleted successfully!`,
            });
        } else {
            res.status(404).json({ message: "Menu not found" });
        }
    } catch (error) {
        console.error("Error in getMenuById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
