const API_KEY = "api_key=de0ab66fbafc67cdcf7fa185440bb9b9&language=pt-BR";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_URL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const search_URL = BASE_URL + `/search/movie?` + API_KEY;

export const APIData = {
  API_KEY,
  BASE_URL,
  POPULAR_URL,
  IMAGE_URL,
  search_URL,
};
