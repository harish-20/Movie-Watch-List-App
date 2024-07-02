import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Rating from "react-animated-rating";

import Reviews from "../components/Reviews/Reviews";

import classes from "./MovieDetails.module.css";
import {
  addReview,
  deleteMovie,
  getMovie,
  updateRating,
  updateWatched,
} from "../service/movie.service";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const { movie: updatedMovie } = await getMovie(id);
        if (updatedMovie) setMovie(updatedMovie);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleRatingChange = (value: number) => {
    setMovie((prev) => (prev ? { ...prev, rating: value } : prev));
    updateRating(movie.id, value);
  };

  const handleWatchedToggle = () => {
    setMovie((prev) => (prev ? { ...prev, isWatched: !prev.isWatched } : prev));
    updateWatched(movie.id, !movie.isWatched);
  };

  const handleEditMovie = () => {
    navigate(`/addMovie/${id}`);
  };

  const handleDeleteMovie = async () => {
    await deleteMovie(movie.id);
    navigate("/");
  };

  const handleAddReview = async (review: string) => {
    const { status } = await addReview(movie.id, review);
    if (status === "ok")
      setMovie((prev) =>
        prev ? { ...prev, review: [...prev.review, review] } : prev
      );
  };

  return (
    <div className={classes["movie-details-section"]}>
      <div className={classes["movie-details"]}>
        <h2>{movie.name}</h2>
        <div className={classes["rating-section"]}>
          <div>{movie.yearOfRelease}</div>
          <div>{movie.genre}</div>
          <div>
            <Rating filled={movie?.rating || 0} onChange={handleRatingChange} />
          </div>
        </div>

        <div className={classes.description}>{movie.description}</div>

        <div className={classes.actions}>
          <button onClick={handleEditMovie}>Edit</button>
          <button
            className={`${movie.isWatched ? "" : classes.active}`}
            onClick={handleWatchedToggle}
          >
            {movie.isWatched ? "Watched" : "Mark As Watched"}
          </button>

          <img
            src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
            alt=""
            onClick={handleDeleteMovie}
          />
        </div>

        <Reviews reviews={movie?.review || []} onAddReview={handleAddReview} />
      </div>

      <div className={classes["image-container"]}>
        <img src={movie.image} />
      </div>
    </div>
  );
};

export default MovieDetail;
