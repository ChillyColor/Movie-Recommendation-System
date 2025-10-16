// server/server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://www.aakarsh.me' || process.env.FRONTEND_URL 
}));

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Popular movies
app.get("/api/popular", async (req, res) => {
  const page = req.query.page || 1;
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  res.json(data.results);
});

// Search movies
app.get("/api/search", async (req, res) => {
  const query = encodeURIComponent(req.query.q || "");
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  res.json(data.results);
});

// Movie details
app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  res.json(data);
});

// Genres
app.get("/api/genres", async (req, res) => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  res.json(data);
});

// Movies by genre
app.get("/api/genre/:id", async (req, res) => {
  const { id } = req.params;
  const page = req.query.page || 1;
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`);
  const data = await response.json();
  res.json(data.results);
});

// Movie trailer
app.get("/api/movie/:id/trailer", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  res.json({ trailerUrl });
});

// Movie reviews
app.get("/api/movie/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  const data = await response.json();
  res.json(data.results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
