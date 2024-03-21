import axios from "axios";
import { Request, Response } from "express";
import * as cheerio from "cheerio";
import { IEpisode, IAnimeInfo } from "../types";
export default async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const baseURL = process.env.BASE_URL;
  const url = `${baseURL}/category/${id}`;
  const ajaxUrl = process.env.AJAX_URL;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const info: IAnimeInfo = {
      id: id,
      title: $(
        "section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > h1"
      )
        .text()
        .trim(),
      url: response.config.url || "",
      image:
        $(
          "section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > img"
        ).attr("src") || "",
      releaseDate: $("div.anime_info_body_bg > p:nth-child(8)")
        .text()
        .trim()
        .split("Released: ")[1],
      episodes: [],
      totalEpisodes: 0,
      description: $("div.anime_info_body_bg > div:nth-child(6)")
        .text()
        .trim()
        .replace("Plot Summary: ", ""),
      genres: [],
    };

    const ep_end = $("#episode_page > li").last().find("a").attr("ep_end");
    const ep_start = $("#episode_page > li").first().find("a").attr("ep_start");
    const movie_id = $("#movie_id").attr("value");
    const alias = $("#alias_anime").attr("value");
    info.totalEpisodes = ep_end ? parseInt(ep_end) : 0;

    const genres = $("div.anime_info_body_bg > p:nth-child(7) > a");
    genres.each((index, element) => {
      info.genres.push($(element).text().trim());
    });
    const html = await axios.get(
      `${ajaxUrl}/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${movie_id}&default_ep=${0}&alias=${alias}`
    );
    const $$ = cheerio.load(html.data);
    $$("#episode_related > li").each((i, el) => {
      info.episodes?.push({
        id: $(el).find("a").attr("href")?.split("/")[1]!,
        number: parseFloat($(el).find(`div.name`).text().replace("EP ", "")),
        url: `${baseURL}/${$(el).find(`a`).attr("href")?.trim()}`,
      });
    });
    info.episodes = info.episodes.reverse();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      error: null,
      data: info,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
