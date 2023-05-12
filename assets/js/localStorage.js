const keyLS = "favoriteMovies";

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(keyLS));
}

function saveToLocalStorage(movie) {
  const movies = getFavoriteMovies() || [];
  movies.push(movie);
  const moviesJSON = JSON.stringify(movies);
  localStorage.setItem(keyLS, moviesJSON);
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || [];
  return movies.find((movie) => movie.id == id);
}

function removeFromLocalStorage(id) {
  const movies = getFavoriteMovies() || [];
  const findMovie = movies.find((movie) => movie.id == id);
  const newMovies = movies.filter((movie) => movie.id != findMovie.id);
  localStorage.removeItem(findMovie);
  localStorage.setItem(keyLS, JSON.stringify(newMovies));
}

export const LocalStorage = {
  getFavoriteMovies,
  saveToLocalStorage,
  checkMovieIsFavorited,
  removeFromLocalStorage,
};
