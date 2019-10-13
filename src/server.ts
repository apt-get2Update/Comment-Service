/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression"; // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
import * as path from "path";
import {EventEmitter} from "events";
import * as Sequelize from "./models/base";
import {default as routes} from "./modules/routes";
import * as cors from "cors";
import expressValidator = require("express-validator");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({path: ".env.example"});

const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("emitter", new EventEmitter());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});
app.use(cors());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000}));

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

app.get("emitter").on("appStarted", function () {
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});

initializeApplication()
    .catch(error => {
        console.log("Error occurred when initializing app.");
        console.log(error);
        process.exit();
    });

module.exports = app;


async function initializeApplication() {
    routes(app);
    await Sequelize.initialize();
    app.listen(app.get("port"), () => {
        app.get("emitter").emit("appStarted");
    });
    return;
}