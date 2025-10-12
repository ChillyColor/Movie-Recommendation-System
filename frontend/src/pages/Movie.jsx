import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieTrailer,
  getMovieReviews,
} from "../services/api";
import "../css/movie.css";
import "../css/review.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const [expandReviews, setExpandReviews] = useState(false);
  const SHORTEN_LENGTH = 300;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        const trailerUrl = await getMovieTrailer(id);
        setTrailer(trailerUrl);
        const reviews = await getMovieReviews(id);
        setReviews(reviews);
      } catch (e) {
        console.error("Error fetching movie details:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Release date unknown";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "Runtime unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="movie-page">
        <div className="movie-container">
          <div className="loading">
            <div className="loading-text">Loading movie details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <div className="movie-container">
        <div className="movie-header">
          {trailer ? (
            <div className="trailer-container">
              <iframe
                src={trailer + "?autoplay=1&mute=0"}
                title={`${movie?.title} Trailer`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="trailer-container">
              <div className="ftrail_container">
                <h2>No trailer Available</h2>
              </div>
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
              />
            </div>
          )}
          <div className="movie-info">
            <h1 className="movie-title">
              {movie?.title} -{movie?.original_language.toUpperCase()}
            </h1>
            <div className="movie-meta">
              <span>{formatDate(movie?.release_date)}</span>
              <span>•</span>
              <span>{formatRuntime(movie?.runtime)}</span>
              <span>•</span>
              <span>{movie?.vote_average?.toFixed(1)} ⭐</span>
            </div>

            <div className="genres">
              {movie?.genres?.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="movie-overview">{movie?.overview}</p>

            <div className="movie-stats">
              <div className="stat">
                <div className="stat-value">
                  {movie?.budget === 0 || !movie?.budget ? "-" : `$${movie.budget.toLocaleString()}`}
                </div>
                <div className="stat-label">Budget</div>
              </div>
              <div className="stat">
                <div className="stat-value">
                  {movie?.revenue === 0 || !movie?.revenue ? "-" : `$${movie.revenue.toLocaleString()}`}
                </div>
                <div className="stat-label">Revenue</div>
              </div>
              <div className="stat">
                <div className="stat-value">
                  {movie?.vote_count?.toLocaleString()}
                </div>
                <div className="stat-label">Votes</div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-section">
          <div className="reviews-header">
            <h2 className="reviews-title">
              <span className="reviews-icon">💬</span>
              User Reviews
              <span className="reviews-count">({reviews?.length || 0})</span>
            </h2>
            <div className="reviews-divider"></div>
          </div>
          
          {reviews && reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-author-info">
                      <div className="author-avatar">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="author-details">
                        <h3 className="review-author">{review.author}</h3>
                        <p className="review-date">{formatDate(review.created_at)}</p>
                      </div>
                    </div>
                    {review.author_details.rating !== null && (
                      <div className="review-rating">
                        <div className="star-rating">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`star ${i < Math.floor(review.author_details.rating / 2) ? 'filled' : ''}`}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="rating-value">{review.author_details.rating}/10</span>
                      </div>
                    )}
                  </div>

                  <div className="review-content">
                    <p className="review-text">
                      {expandReviews === review.id ||
                      review.content.length <= SHORTEN_LENGTH
                        ? review.content
                        : `${review.content.slice(0, SHORTEN_LENGTH)}...`}
                    </p>

                    {review.content.length > SHORTEN_LENGTH && (
                      <button
                        className="read-more-btn"
                        onClick={() => {
                          setExpandReviews(
                            expandReviews === review.id ? null : review.id
                          );
                        }}
                      >
                        {expandReviews === review.id ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <div className="no-reviews-icon">📝</div>
              <p>No reviews available for this movie yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
