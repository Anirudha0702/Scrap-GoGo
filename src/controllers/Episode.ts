import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import VideoExtract from "../utils/VideoExtract";
export default async(req: Request, res: Response): Promise<Response> => {
    try {
        const res_= await VideoExtract(new URL(`${process.env.BASE_URL}/${req.params.ep_id}`));
        return res.status(200).json(res_)
    } catch (error) {
        return res.status(500).json(error)
    }
}