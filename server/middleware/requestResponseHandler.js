/** IMPORTS */
import { logEvents } from './logEvents.js';

/** REQ AND RES LOG */
export const reqResLog = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${res.statusCode}\n`, "reqLog.txt");
  res.status(500).send(error.message);
  next();
};