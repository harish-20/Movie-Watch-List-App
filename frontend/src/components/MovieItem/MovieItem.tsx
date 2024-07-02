import React from "react";

import classes from "./MovieItem.module.css";
import { Link } from "react-router-dom";

type MovieItemProps = {
  movie: Movie;
};

const MovieItem: React.FC<MovieItemProps> = (props) => {
  const { movie } = props;

  return (
    <Link to={`/movie/${movie.id}`} className={classes["movie-item"]}>
      <div className={classes.image}>
        <img src={movie.image} alt={movie.name} />
      </div>
      <div className={classes.description}>
        <h2>{movie.name}</h2>
        <h3>{movie.genre}</h3>
      </div>
    </Link>
  );
};

export default MovieItem;
