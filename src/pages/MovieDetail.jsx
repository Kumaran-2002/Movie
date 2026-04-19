import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(location.state || null);

  // useEffect(() => {
  //   if (!movie) {
  //     fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_KEY`)
  //       .then((res) => res.json())
  //       .then((data) => setMovie(data));
  //   }
  // }, [id, movie]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* Content */}
      <div className="detail-content">
        <h1>{movie.title}</h1>

        <p className="meta">
          ⭐ {movie.vote_average} | {movie.release_date}
        </p>

        <p className="overview">{movie.overview}</p>

        <button className="play-btn">▶ Play</button>
      </div>
    </div>
  );
};

export default MovieDetail;
