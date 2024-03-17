export interface ISearch<T>{
currentPage?: number;
  hasNextPage?: boolean;
  totalPages?: number;
  totalResults?: number;
  results: T[]; 
}
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