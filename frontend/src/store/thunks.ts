import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../service/movie.service";

const getAllMovies = createAsyncThunk<Movie[], void, any>(
  "get-movies",
  async (_, thunkApi) => {
    const { movies } = await api.getAllMovies();

    return movies;
  }
);

export { getAllMovies };
