import { Request, Response } from "express";
import axios from "axios";
import { ISearch, IAnimeResult } from "../types";
import * as cheerio from "cheerio";
export default async (req: Request, res: Response): Promise<Response> => {
  const { keyword, page } = req.query;
  let baseURL = process.env.BASE_URL;
  let url = `${baseURL}/filter.html?keyword=${keyword}&page=${page}`;
  console.log(url)
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const searchResult: ISearch<IAnimeResult> = {
      currentPage: parseInt(page as string) || 1,
      hasNextPage: false,
      results: [],
    };
    const animes = $("div.last_episodes ul.items>li");
    animes.each((index, element) => {
      const anime: IAnimeResult = {
        id: $(element).find("p.name > a").attr("href")?.split("/")[2] || "",
        title: $(element).find("p.name > a").text() || "",
        image: $(element).find("div.img > a > img").attr("src") || "",
      };
      searchResult.results.push(anime);
    });
    return res.json(searchResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
