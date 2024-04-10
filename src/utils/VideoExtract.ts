import axios from "axios";
import generateEncryptedAjaxParams from "./generateEncryptedAjaxParams";
import decryptAjaxData from "./decryptAjaxData";
import CryptoJS from "crypto-js";
import { IVideo } from "../types";
import { load } from "cheerio";
export default async function (videoUrl: URL): Promise<IVideo[]> {
  const keys = {
    key: CryptoJS.enc.Utf8.parse("37911490979715163134003223491201"),
    secondKey: CryptoJS.enc.Utf8.parse("54674138327930866480207815084989"),
    iv: CryptoJS.enc.Utf8.parse("3134003223491201"),
  };
  const sources: IVideo[] = [];
  const res = await axios.get(videoUrl.href);
  const $ = load(res.data);
  const serverUrl = new URL(`${$('#load_anime > div > div > iframe').attr('src')}`);
  const $_ = load((await axios.get(serverUrl.href)).data);
  const encyptedParams = await generateEncryptedAjaxParams(
      $_,
      serverUrl.searchParams.get("id") ?? "",
      keys
      );
  const encryptedData = await axios.get(
    `${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${encyptedParams}`,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  const decryptedData = await decryptAjaxData(encryptedData.data.data, keys);
  if (!decryptedData.source)
    throw new Error("No source found. Try a different server.");

  if (decryptedData.source[0].file.includes(".m3u8")) {
    const resResult = await axios.get(decryptedData.source[0].file.toString());
    const resolutions = resResult.data.match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g);
    resolutions?.forEach((res: string) => {
      const index = decryptedData.source[0].file.lastIndexOf("/");
      const quality = res.split("\n")[0].split("x")[1].split(",")[0];
      const url = decryptedData.source[0].file.slice(0, index);
      sources.push({
        url: url + "/" + res.split("\n")[1],
        isM3U8: (url + res.split("\n")[1]).includes(".m3u8"),
        quality: quality + "p",
      });
    });

    decryptedData.source.forEach((source: any) => {
      sources.push({
        url: source.file,
        isM3U8: source.file.includes(".m3u8"),
        quality: "default",
      });
    });
  } else
    decryptedData.source.forEach((source: any) => {
      sources.push({
        url: source.file,
        isM3U8: source.file.includes(".m3u8"),
        quality: source.label.split(" ")[0] + "p",
      });
    });

  decryptedData.source_bk.forEach((source: any) => {
    sources.push({
      url: source.file,
      isM3U8: source.file.includes(".m3u8"),
      quality: "backup",
    });
  });

  return sources;
}
