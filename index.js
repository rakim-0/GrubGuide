require("dotenv").config();

const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const mySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2");
const { localStrategy } = require("./routes/auth");
const User = require("./model/user");
const app = express();

const menuRouter = require("./routes/menu");
const dishRouter = require("./routes/dish");
const cartRouter = require("./routes/cart");
const restaurantRouter = require("./routes/restaurant");
const syncDatabase = require("./db/sync-databases");
const viewRouter = require("./routes/views");
const fileRouter = require("./routes/file");
const orderRouter = require("./routes/order");

app.use(express.static("./views/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: "true", limit: "50mb" })); // 50mb to allow big forms/large data.
var options = {
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
};
var connection = mysql.createConnection(options);
const sessionStore = new mySQLStore(
    {
        checkExpirationInterval: 100000, // How frequently expired sessions will be cleared; milliseconds.
        expiration: 900000, // The maximum age of a valid session; milliseconds.
        createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
        schema: {
            tableName: "sessions",
            columnNames: {
                session_id: "session_id",
                expires: "expires",
                data: "data",
            },
        },
    },
    connection
);
app.use(
    session({
        secret: "cats",
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.user) {
        res.locals.currentUser = {
            id: req.user.dataValues.id,
            username: req.user.dataValues.username,
            name: req.user.dataValues.name,
            role: req.user.dataValues.role,
        };
    }
    res.locals.query = req.query;
    res.locals.url = req.originalUrl;
    next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use([
    menuRouter,
    dishRouter,
    restaurantRouter,
    viewRouter,
    fileRouter,
    cartRouter,
    orderRouter,
]);

syncDatabase()
    .then(() => {
        app.listen(8080, () => {
            console.log("Server is listening on port 8080");
        });
    })
    .catch((error) => {
        console.error("Failed to sync database:", error);
    });

app.post("/signup", async (req, res, next) => {
    try {
        req.body.role = 1;
        const user = await User.create(req.body);
        if (user) return res.json(user);
        return new error("user could not be created");
    } catch (err) {
        return next(err);
    }
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/failure",
    })
);
app.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
passport.use(localStrategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        // TODO: Implement redis.
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
