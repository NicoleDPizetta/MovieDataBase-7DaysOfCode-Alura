import { APIData } from "./api.js";

async function searchMovieByName(searchTerms) {
  const url = APIData.search_URL + `&query=` + searchTerms;
  const fetchResponse = await fetch(url);
  const { results } = await fetchResponse.json();
  return results;
}

export const Search = {
  searchMovieByName,
};
