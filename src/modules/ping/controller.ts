"use strict";
import {RequestHandler} from "../common/request-handler";

/**
 * GET /api
 * List of API examples.
 */
export let ping = (handler: RequestHandler) => {
    handler.sendResponse({
        response: "pong",
        time: new Date()
    });
};
