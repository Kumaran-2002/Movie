import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   loadPopularMovies();
  // }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const newMovies = await getPopularMovies(page);

      setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));

      setError(null);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setPage(1);
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, [page]);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && (
        <div className="error-state">
          <h2>⚠️ {error}</h2>
          <button onClick={loadPopularMovies}>Retry</button>
        </div>
      )}

      {loading && (
        <div className="movies-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && !error && (
        <div className="empty-state">
          <h2>🎬 No Movies Found</h2>
          <p>Try searching something else</p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie?.id} />
          ))}
        </div>
      )}

      {!loading && (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button
            className="search-button"
            onClick={() => setPage((p) => p + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
