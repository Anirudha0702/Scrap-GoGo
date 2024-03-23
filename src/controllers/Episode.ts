import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import VideoExtract from "../utils/VideoExtract";
import { error } from "console";
export default async(req: Request, res: Response): Promise<Response> => {
    try {
        const res_= await VideoExtract(new URL(`${process.env.BASE_URL}/${req.params.ep_id}`));
        return res.status(200).json({
            success: true,
            statusCode: 200,
            error: null,
            data: res_
            
        })
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: error.message,
            data: null
        })
    }
}