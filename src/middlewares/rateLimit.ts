import setRateLimit from "express-rate-limit";

import { Request, Response } from "express";
import { data } from "cheerio/lib/api/attributes";
const maxRequest=15;
const exceedHandler = (req:Request, res:Response) => {
    res.status(429).json({
        success: false,
        statusCode: 429,
        error:`Too many requests, you have exceeded your ${maxRequest} requests per minute limit.`,
        data:null
    });
};
const rateLimit = setRateLimit({
    windowMs: 60 * 1000,
    max: maxRequest,
    headers: true,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler:exceedHandler
});
export default rateLimit;