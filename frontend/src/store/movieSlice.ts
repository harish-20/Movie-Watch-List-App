import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAllMovies } from "./thunks";
import { getAllMoviesFulfilled, getAllMoviesPending } from "./thunkHandlers";

const initialState: MovieReducerState = {
  isMovieListLoading: false,
  movieList: [],
};

const movieSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    intiateMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movieList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, getAllMoviesPending);
    builder.addCase(getAllMovies.fulfilled, getAllMoviesFulfilled);
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
