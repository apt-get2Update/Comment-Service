import {Express} from "express";
import * as controller from "./controller";
import {handle} from "../common/request-handler";

export default function (app: Express) {
    app.get("/ping", handle(controller.ping));
}