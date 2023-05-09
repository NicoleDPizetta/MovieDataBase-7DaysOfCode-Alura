const API_KEY = "api_key=de0ab66fbafc67cdcf7fa185440bb9b9&language=pt-BR";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_URL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const search_URL = BASE_URL + `/search/movie?` + API_KEY;

const main = document.getElementById("movies");
const form = document.getElementById("searcher");
const search = document.getElementById("form-search");

/* Requisição na API */
async function getMovies(url) {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showPopularMovies(data.results);
    });

  return response;
}

getMovies(POPULAR_URL);

/* Mostra os filmes na tela */
async function showPopularMovies(response) {
  main.innerHTML = "";

  await response.forEach((movie) => {
    const { title, poster_path, vote_average, vote_count, overview } = movie;
    const movieElement = document.createElement("div");

    movieElement.classList.add("container-movie");
    movieElement.innerHTML = `
        <div class="movie-poster">
        <img src='${
          IMAGE_URL + poster_path
        }' alt="${title}" title="Poster do filme ${title}">
      </div>

      <div class="movie-infos">
        <h2 class="movie-name">${title}</h2>
        <div class="icons-movie">
          <span class="${getColor(vote_average)}" id="movie-stars">
            <img src="./assets/images/star.svg" alt="Ícone de estrela" title="Nota média baseada em ${vote_count} votos.">
            <p>${vote_average.toFixed(1)}</p>
          </span>
          
          <span class="movie-favorite">
            <input type="checkbox" name="favoriteBtn" class="favoriteBtn" id="favoriteBtn" title="Adicionar aos favoritos"/>
            <label>Favoritar</label>
          </span>
          </span>
        </div>
      </div>

      <div class="movie-description">
        <p movie-sinopse>${overview}</p>
      </div>
        `;

    main.appendChild(movieElement);
  });
}

/* Trocar a cor da nota do filme */
function getColor(vote) {
  if (vote >= 8) {
    return `lightgreen`;
  } else if (vote >= 5) {
    return `orange`;
  } else {
    return `red`;
  }
}

/* Buscar filmes através do campo de pesquisa */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerms = search.value;

  if (searchTerms) {
    getMovies(search_URL + `&query=` + searchTerms);
  } else {
    getMovies(POPULAR_URL);
  }
});
