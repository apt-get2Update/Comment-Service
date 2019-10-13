import {Request, Response} from "express";
import _ = require("lodash");
import Users from '../users/models/Users';
export class RequestHandler {
    private request: Request;
    private response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    getBody() {
        return this.request.body;
    }

    getRequest() {
        return this.request;
    }

    getRequestParameter(key: string) {
        return this.request.params[key];
    }
    
    getRequestQueryParameter(key: string) {
        return this.request.query[key];
    }

    validate(field: string, message: string) {
        return this.request.assert(field, message);
    }

    async performValidation(): Promise<boolean> {
        const result = await this.request.getValidationResult();
        if (!result.isEmpty()) {
            this.sendValidationError(result.array());
            return false;
        }
        return true;
    }

    sendResponse(data?: object) {
        return this.response.status(200).send(data);
    }

    sendNotFoundResponse(data?: object) {
        return this.response.status(404).send(data);
    }

    sendCreatedResponse(data?: object) {
        return this.response.status(201).send(data);
    }

    sendValidationError(error?: any) {
        return this.response.status(400).send({error});
    }

    sendServerError(error?: any) {
        return this.response.status(500).send({error: `Internal Server Error`, message: error.message || error});
    }
}

export function handle(method: (handler: RequestHandler, next?: () => void) => void) {
    return (request: Request, response: Response, next: () => void) => {
        method(new RequestHandler(request, response), next);
    };
}

export async function authenticate(request: Request, response: Response, next: (error?: any) => void) {
    
    const authTokenString = (request.headers["authorization"] || "").toString();
    if (!authTokenString) response.send(401).end();
    const authToken = authTokenString.split("Bearer ")[1];

    const user = await Users.findOne<Users>({ where: { token: authToken } });
    request.body["user"] = user.toJSON();

    if (!user) response.send(401).end();
    next();
}