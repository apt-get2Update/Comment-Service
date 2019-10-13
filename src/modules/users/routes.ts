import { Express } from "express";
import { handle } from "../common/request-handler";
import * as controller from "./controllers";

export default function (app: Express) {
    app.post("/register", handle(controller.newUserRigistration));
    app.post("/login",  handle(controller.login));
}
