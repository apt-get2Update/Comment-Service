const neo4j = require("neo4j-driver").v1;

import { load as configLoader } from "../config/env";
const config = configLoader();
const { url, username, password } = config.graphDB;

const driver = neo4j.driver(url, neo4j.auth.basic(username, password));

function query(queryString: string, params?: object) {
    const session = driver.session();
    return new Promise(function (resolve, reject) {
        session
            .run(queryString, params)
            .then((result: any) => {
                session.close();
                console.log(` *** The query string is ${queryString} and params: ${JSON.stringify(params)} and result is ${JSON.stringify(result)} ***`);
                return resolve(result.records);
            })
            .catch((error: object) => {
                console.log(`In the catch block, the error is ${error}`);
                return reject(error);
            });
    });
}

export default { query };