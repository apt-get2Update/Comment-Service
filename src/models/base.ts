import {Sequelize as Sequelize} from "sequelize-typescript";

import {load as configLoader} from "../config/env";

const config = configLoader();

let sequelize: Sequelize;

export function getInstance(): Promise<Sequelize> {
    if (!sequelize) {
        sequelize = new Sequelize({
            logging: false,
            dialect: "postgres",
            host: config.db.host,
            port: config.db.port,
            name: config.db.database,
            username: config.db.username,
            password: config.db.password,
            modelPaths: [
                __dirname + "/../modules/users/models/",  
            ],
            pool: {
                min: 1,
                max: 20,
                idle: 10000
            }
        });
    }
    return Promise.resolve(sequelize);
}

export function initialize(): Promise<Sequelize> {
    return getInstance();
}
