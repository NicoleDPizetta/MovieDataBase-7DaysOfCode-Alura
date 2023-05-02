const API_KEY = "api_key=de0ab66fbafc67cdcf7fa185440bb9b9&language=pt-BR";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const search_URL = BASE_URL + `search/movie?` + API_KEY;

const main = document.getElementById("movies");

const form = document.getElementById("searcher");
const search = document.getElementById("form-search");

/* Requisição na API */
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

getMovies(API_URL);

/* Mostra os filmes na tela */
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
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
          <p class="${getColor(
            vote_average
          )} movie-stars" id="color-votes"><img src="./assets/images/star.svg" alt="Ícone de estrela" title="Nota média">${vote_average}</p>
          <p class="movie-favorite"><img src="./assets/images/heart.svg" alt="Ícone de coração" title="Adicionar aos favoritos">Favoritar</p>
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
    return `green`;
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
    getMovies(API_URL);
  }
});
