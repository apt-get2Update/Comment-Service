

import { RequestHandler } from "../common/request-handler";
import * as Sequelize from "../../models/base";
import Users from "./models/Users";
import * as _ from "lodash";
const uuidv4 = require('uuid/v4');


export async function newUserRigistration(handler: RequestHandler) {

    const body = handler.getBody();
    const token = uuidv4(); 
    try {
        const sequelize = await Sequelize.getInstance();
        await sequelize.transaction(async transaction => {
            const user = await Users.build({
                name: body.name,
                mail:body.mail,
                token: token
            }).save({ transaction });
            return handler.sendResponse(user);
        });
    } catch (error) {
        return handler.sendServerError(error);
    }
}

export async function login(handler: RequestHandler) {
    const { mail} = handler.getBody();
    try {
        const user = await Users.findOne<Users>({ where: { mail: mail } });
        if(!user)
        return handler.sendNotFoundResponse({message:"user not found"})
        return handler.sendResponse(user);
    } catch (error) {
        return handler.sendServerError(error);
    }
}
