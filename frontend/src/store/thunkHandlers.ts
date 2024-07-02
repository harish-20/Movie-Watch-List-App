import { PayloadAction } from "@reduxjs/toolkit";

export const getAllMoviesPending = (state: MovieReducerState) => {
  state.isMovieListLoading = true;
};

export const getAllMoviesFulfilled = (
  state: MovieReducerState,
  action: PayloadAction<Movie[]>
) => {
  state.movieList = action.payload;
  state.isMovieListLoading = false;
};
