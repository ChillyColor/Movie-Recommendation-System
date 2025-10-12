

const BACKEND_URL = "http://localhost:5000/api";

export const getPopularMovies = async () => {
  const response = await fetch(`${BACKEND_URL}/popular`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

export const getMoviesByPage = async (page) => {
  const response = await fetch(`${BACKEND_URL}/popular?page=${page}`);
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(`${BACKEND_URL}/genres`);
  const data = await response.json();
  return data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(`${BACKEND_URL}/genre/${genreId}?page=${page}`);
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BACKEND_URL}/movie/${movieId}`);
  const data = await response.json();
  return data;
};

export async function getMovieTrailer(id) {
  const res = await fetch(`${BACKEND_URL}/movie/${id}/trailer`);
  const data = await res.json();
  return data.trailerUrl;
}

export async function getMovieReviews(id) {
  const res = await fetch(`${BACKEND_URL}/movie/${id}/reviews`);
  const data = await res.json();
  return data;
}
