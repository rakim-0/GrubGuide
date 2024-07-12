const express = require("express");
const menuRouter = require("./routes/menu");
const dishRouter = require("./routes/dish");
const restaurantRouter = require("./routes/restaurant");
const syncDatabase = require("./db/sync-databases");
const app = express();

app.use(express.json());

app.use(menuRouter);
app.use(dishRouter);
app.use(restaurantRouter);

app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("index.ejs");
});

syncDatabase()
    .then(() => {
        app.listen(8080, () => {
            console.log("Server is listening on port 8080");
        });
    })
    .catch((error) => {
        console.error("Failed to sync database:", error);
    });
