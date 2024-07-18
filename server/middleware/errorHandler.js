/** IMPORTS */
import { logEvents } from "./logEvents.js";

/** ERROR LOG */
export const errorLog = (req, res,error, next) => {
    logEvents(`${error.name}: ${error.message}\n`, "errorLog.txt");
    next();
};

