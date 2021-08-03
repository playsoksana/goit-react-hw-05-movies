const BASE = 'https://api.themoviedb.org/3/';
const KEY = 'de2580cf82fb3c491bffe484bc91ca51';

async function fetchByTrending() {
  const response = await fetch(`${BASE}trending/all/day?api_key=${KEY}`);
  return response.json();
}

async function fetchByIdMovies(movieId) {
  const response = await fetch(`${BASE}movie/${movieId}?api_key=${KEY}`);
  return response.json();
}

async function fetchByIdMoviesActors(movieId) {
  const response = await fetch(
    `${BASE}movie/${movieId}/credits?api_key=${KEY}`,
  );
  return response.json();
}

async function fetchByIdMoviesReviews(movieId) {
  const response = await fetch(
    `${BASE}movie/${movieId}/reviews?api_key=${KEY}&page=1`,
  );
  return response.json();
}

async function fetchOnSearch(search) {
  const response = await fetch(
    `${BASE}search/movie?api_key=${KEY}&page=1&query=${search}`,
  );
  return response.json();
}

export {
  fetchByTrending,
  fetchByIdMovies,
  fetchByIdMoviesActors,
  fetchByIdMoviesReviews,
  fetchOnSearch,
};
