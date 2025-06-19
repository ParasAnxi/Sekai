/** IMPORTS */
import { logEvents } from "./logEvents.js";

/** ERROR LOG */
export const errorLog = (error,req, res, next) => {
    logEvents(`${error.name}: ${error.message}\n`, "errorLog.txt");
    next();
};

