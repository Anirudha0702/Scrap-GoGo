
export interface ITitle {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  }
export interface IAnimeResult {
    id: string;
    title: string | ITitle;
    url?: string;
    image?: string;
    imageHash?: string;
    cover?: string;
    coverHash?: string;
    status?: String;
    rating?: number;
    type?: String;
    releaseDate?: string;
  }
  export interface IAnimeInfo extends IAnimeResult {
    episodes: IEpisode[],
    totalEpisodes: number,
    description:string,
    genres: string[],
  }
  export interface IEpisode{
    id:string,
    title?:string,
    number: number,
    description?:string,
    url?:string,
    image?:string,
    imageHash?:string,
    releaseDate?:string,
  }