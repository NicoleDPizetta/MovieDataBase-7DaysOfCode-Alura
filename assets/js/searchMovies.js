import { APIData } from "./api.js";
import { CleanAllMovies } from "./main.js";
export const SearchMovie = {
  searchMovie,
};

const search = document.getElementById("form-search");
const searchURL = APIData.search_URL;

function searchMovie() {
  const searchTerms = search.value;

  if (searchTerms) {
    CleanAllMovies.cleanAllMovies;
    getMovies(searchURL + `&query=` + searchTerms);
  } else {
    getPopularMovies();
  }
}
