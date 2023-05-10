import { APIData } from "./api.js";
import { LocalStorage } from "./localStorage.js";
import { GetColor } from "./getColor.js";
import { SearchMovie } from "./searchMovies.js";

export const CleanAllMovies = {
  cleanAllMovies,
};

const main = document.getElementById("movies");
const form = document.getElementById("searcher");
const searchButton = document.getElementById("search-icon");
/* const checkboxInput = document.getElementById("checkbox"); */
const input = document.querySelector("input");
const checkboxInput = document.querySelector('input[type="checkbox"]');

checkboxInput.addEventListener("change", checkCheckboxStatus);
searchButton.addEventListener("click", SearchMovie.searchMovie);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  SearchMovie.searchMovie;
});

window.onload = function () {
  getPopularMovies();
};

function checkCheckboxStatus() {
  const isChecked = checkboxInput.checked;
  cleanAllMovies();
  if (isChecked) {
    const movies = LocalStorage.getFavoriteMovies() || [];
    movies.forEach((movie) => renderMovie(movie));
  } else {
    getPopularMovies();
  }
}

function cleanAllMovies() {
  main.innerHTML = "";
}

/* Testes */
async function getMovies() {
  const url = APIData.POPULAR_URL;
  const fetchResponse = await fetch(url);
  const { results } = await fetchResponse.json();
  return results;
}

async function getPopularMovies() {
  const movies = await getMovies();
  movies.forEach((movie) => renderMovie(movie));
}

function favoriteBtnPressed(event, movie) {
  const favoriteState = {
    favorited: "../assets/images/favorited.svg",
    notFavorited: "../assets/images/heart.svg",
  };
  if (event.target.src.includes(favoriteState.notFavorited)) {
    event.target.src = favoriteState.favorited;
    console.log("Sou um favorito agora");
    LocalStorage.saveToLocalStorage(movie.id);
  } else {
    event.target.src = favoriteState.notFavorited;
    console.log("Não sou um favorito");
    LocalStorage.removeFromLocalStorage(movie.id);
  }
}

function renderMovie(movie) {
  const { id, title, poster_path, vote_average, vote_count, overview } = movie;

  const isFavorited = LocalStorage.checkMovieIsFavorited(id);
  const imageURL = `${APIData.IMAGE_URL}`;

  /* Container de conteúdo de cada filme */
  const movieElement = document.createElement("div");
  movieElement.classList.add("container-movie");
  main.appendChild(movieElement);

  /* Container do poster */
  const movieImageContainer = document.createElement("div");
  movieImageContainer.classList.add("movie-poster");

  /* Imagem do poster do filme */
  const movieImage = document.createElement("img");
  movieImage.src = `${imageURL + poster_path}`;
  movieImage.alt = `Poster do filme ${title}`;
  movieImage.title = `Poster do filme ${title}`;

  movieElement.appendChild(movieImageContainer);
  movieImageContainer.appendChild(movieImage);

  /* Container de infos do filme */
  const movieInfosContainer = document.createElement("div");
  movieInfosContainer.classList.add("movie-infos");

  movieElement.appendChild(movieInfosContainer);

  /* Nome do filme */
  const movieTitle = document.createElement("h2");
  movieTitle.classList.add("movie-name");
  movieTitle.textContent = `${title}`;

  movieInfosContainer.appendChild(movieTitle);

  /* Container de ícones */
  const icons = document.createElement("div");
  icons.classList.add("icons-movie");

  movieInfosContainer.appendChild(icons);

  /* Container da nota do filme */
  const ratingContainer = document.createElement("span");
  ratingContainer.classList.add("rating");

  /* Ícone de estrela */
  const starImage = document.createElement("img");
  starImage.src = "../assets/images/star.svg";
  starImage.alt = "Ícone de estrela";

  /* Nota média do filme texto */
  const movieRate = document.createElement("p");
  movieRate.classList.add("movie-rate");
  movieRate.textContent = `${vote_average.toFixed(1)}`;
  movieRate.style.color = `${GetColor.getColor(vote_average)}`;
  movieRate.title = `Nota média baseada em ${vote_count} votos.`;

  ratingContainer.appendChild(starImage);
  ratingContainer.appendChild(movieRate);
  icons.appendChild(ratingContainer);

  /* Container de Favoritar */
  const favorite = document.createElement("div");
  favorite.classList.add("movie-favorite");
  favorite.title = `Adicionar aos favoritos`;

  /* Ícone de coração */
  const favoriteImage = document.createElement("img");
  favoriteImage.src = isFavorited
    ? "../assets/images/favorited.svg"
    : "../assets/images/heart.svg";
  favoriteImage.alt = "Ícone de coração";
  favoriteImage.classList.add("favoriteBtn");
  favoriteImage.addEventListener("click", (event) =>
    favoriteBtnPressed(event, movie)
  );

  /* Texto Favoritos */
  const favoriteText = document.createElement("span");
  favoriteText.classList.add("movie-favorite");
  favoriteText.textContent = "Favoritar";

  favorite.appendChild(favoriteImage);
  favorite.appendChild(favoriteText);
  icons.appendChild(favorite);

  /* Container de decrição do filme */
  const movieDescriptionContainer = document.createElement("div");
  movieDescriptionContainer.classList.add("movie-description");

  const movieDescription = document.createElement("span");
  movieDescription.textContent = overview;

  movieDescriptionContainer.appendChild(movieDescription);

  movieElement.appendChild(movieDescriptionContainer);
}
