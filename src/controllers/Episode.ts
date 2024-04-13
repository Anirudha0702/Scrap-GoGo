import { Request, Response } from "express";
import  { AxiosError } from "axios";
import VideoExtract from "../utils/VideoExtract";
export default async(req: Request, res: Response) => {
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
            error: error instanceof AxiosError?"Gogo Anime is down or may have changed is domain":error.message || "Internal Server Error",
            data: null
        })
    }
}