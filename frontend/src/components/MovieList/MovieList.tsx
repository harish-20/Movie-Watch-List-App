import React, { useEffect, useState } from "react";

import MovieItem from "../MovieItem/MovieItem";

import { useAppDispatch, useAppSelector } from "../../store";
import { getAllMovies } from "../../store/thunks";

import classes from "./MovieList.module.css";

type Filter = "watched" | "unwatched";

const MovieList: React.FC = () => {
  const movies = useAppSelector((state) => state.movie.movieList);
  const isMovieListLoading = useAppSelector(
    (state) => state.movie.isMovieListLoading
  );

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<Filter | null>(null);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  let filteredMovieList = movies;
  if (filter) {
    filteredMovieList = movies.filter((movie) =>
      filter === "unwatched" ? !movie.isWatched : movie.isWatched
    );
  }

  const handleFilterChange = (updatedFilter: Filter | null) => {
    setFilter((prev) => (prev === updatedFilter ? null : updatedFilter));
  };

  if (isMovieListLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={classes["movie-list-container"]}>
      <div className={classes.header}>
        <h3 className={classes.title}>Your Recent Movies</h3>
        <div
          className={`${classes.filter} ${!filter ? classes.active : ""}`}
          onClick={() => handleFilterChange(null)}
        >
          All
        </div>

        <div
          className={`${classes.filter} ${
            filter === "watched" ? classes.active : ""
          }`}
          onClick={() => handleFilterChange("watched")}
        >
          Watched
        </div>
        <div
          className={`${classes.filter} ${
            filter === "unwatched" ? classes.active : ""
          }`}
          onClick={() => handleFilterChange("unwatched")}
        >
          Unwatched
        </div>
      </div>
      <div className={classes["movie-list"]}>
        {filteredMovieList.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
