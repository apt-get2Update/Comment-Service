require("dotenv").config();

export function authenticationToken() {
    return process.env.SESSION_SECRET;
}
