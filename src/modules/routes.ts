import * as homeController from "./home/controller";
import {Express} from "express";

import {default as pingRoutes} from "./ping/routes";
import {default as userRoutes} from "./users/routes";
import {default as comments} from "./commont/routes";


export default function (app: Express) {
    app.get("/", homeController.index);
    pingRoutes(app);
    userRoutes(app);
    comments(app);
}
