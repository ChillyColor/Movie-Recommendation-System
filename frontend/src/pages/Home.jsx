import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByPage,
  getGenres,
  getMoviesByGenre,
} from "../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import "../css/Home.css";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setmovies(popularMovies);
        console.log('Loaded popular movies:', popularMovies?.length);
        // load genres for the genre select
        try {
          const genreData = await getGenres();
          setGenres(genreData.genres || []);
          console.log('Loaded genres:', genreData.genres?.length);
        } catch (gerr) {
          console.log("Failed to load genres", gerr);
          setError('Failed to load genres');
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  const fetchMoreMovies = async () => {
    try {
      const moreMovies = await getMoviesByPage(page);
      console.log(`Fetched more movies page=${page}:`, moreMovies?.length);
      setmovies((prevMovies) => [...prevMovies, ...moreMovies]);
      setPage((prevPage) => prevPage + 1);
      if (moreMovies.length === 0) setHasMore(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load more movies...");
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setmovies(searchResults);
      setIsSearching(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies....");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = async () => {
    setSearchQuery("");
    setIsSearching(false);
    setLoading(true);
    try {
      const popularMovies = selectedGenre ? await getMoviesByGenre(selectedGenre, 1) : await getPopularMovies();
      setmovies(popularMovies);
      setError(null);
      setPage(2);
      setHasMore(true);
    } catch (err) {
      console.log(err);
      setError("Failed to reload popular movies...");
    } finally {
      setLoading(false);
    }
  };

  const onGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    setLoading(true);
    setIsSearching(false);
    try {
      if (!genreId) {
        const popularMovies = await getPopularMovies();
        setmovies(popularMovies);
      } else {
        const moviesByGenre = await getMoviesByGenre(genreId, 1);
        setmovies(moviesByGenre);
      }
      setPage(2);
      setHasMore(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load genre movies...");
    } finally {
      setLoading(false);
    }
  };
  // When searching, render without InfiniteScroll so results are fixed
  if (isSearching) {
    return (
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search For Movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" className="search-buttom">
              Search
            </button>
            <button
              type="button"
              className="search-buttom"
              onClick={clearSearch}
            >
              Clear
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <div>Loading movies...</div>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default view uses InfiniteScroll
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMoreMovies}
      hasMore={hasMore}
      loader={
        <div className="loading">
          <div className="spinner" />
          <div>Loading more movies...</div>
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
      }
    >
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search For Movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-buttom">
            Search
          </button>
          <select
            className="genre-select"
            value={selectedGenre}
            onChange={onGenreChange}
            aria-label="Filter by genre"
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <div>Loading movies...</div>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}
export default Home;
