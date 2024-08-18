const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const { localStrategy } = require("./routes/auth");
const User = require("./model/user");
const app = express();

const menuRouter = require("./routes/menu");
const dishRouter = require("./routes/dish");
const restaurantRouter = require("./routes/restaurant");
const syncDatabase = require("./db/sync-databases");
const viewRouter = require("./routes/views");

// TODO: add express-session-mysql: https://www.npmjs.com/package/express-mysql-session
// TODO: split views/.ejs files into components.
// TODO: upload.js or dropzone.dev.
// TODO: https://summernote.org/ for description box.
app.use(express.json());
app.use(express.urlencoded({ extended: "true", limit: "50mb" })); // 50mb to allow big forms/large data.
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    res.locals.query = req.query;
    res.locals.url = req.originalUrl;
    next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use([menuRouter, dishRouter, restaurantRouter, viewRouter]);

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
        successRedirect: "/create-restaurant",
        failureRedirect: "/failure",
    })
);

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
