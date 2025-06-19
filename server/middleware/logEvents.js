/** IMPORTS */
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import fsPomises from 'fs/promises';

/** CONFIG */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** LOGGER */

export const logEvents = async(message, logType)=>{
    const dateTime = `${format(new Date(),'yyy MM dd\tHH:mm:ss')}`;
    const log = `${dateTime}\t${uuid()}\t${message}`;
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPomises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPomises.appendFile(path.join(__dirname,'..','logs',logType),log);
    }
    catch(error){
        console.log(error);
    }
};

