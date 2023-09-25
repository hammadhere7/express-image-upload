import {Response} from "express";
export const sendResponse=(res: Response, msg: string='', statusCode=200, contentType= 'text/plain')=>{
    res.status(statusCode)
        .contentType(contentType)
        .end(msg);
}
