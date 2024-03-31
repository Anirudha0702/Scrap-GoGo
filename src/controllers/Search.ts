import { Request, Response } from "express";
import axios from "axios";
import {  IAnimeResult } from "../types";
import * as cheerio from "cheerio";
export default async (req: Request, res: Response): Promise<Response> => {
  const { keyword, page } = req.query;
  if(!keyword ) return res.status(400).json(
    {
      success:false,
      statusCode:400,
      error:"keyword is required",
      data:null
    });

  const baseURL = process.env.BASE_URL;
  const url = `${baseURL}/filter.html?keyword=${keyword}&page=${page}`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const searchResult: IAnimeResult[] = [];  
    const animes = $("div.last_episodes ul.items>li");
    animes.each((index, element) => {
      const anime: IAnimeResult = {
        id: $(element).find("p.name > a").attr("href")?.split("/")[2] || "",
        title: $(element).find("p.name > a").text() || "",
        image: $(element).find("div.img > a > img").attr("src") || "",
      };
      searchResult.push(anime);
    });
    return res.json({
      success: true,
      statusCode:200,
      error:null,
      data:searchResult,

    });
  } catch (error:any  ) {
      return res.status(500).json({
        success: false,
        statusCode:500,
        error:error,
        data:null
      })
    }
};
