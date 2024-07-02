import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api"
    : "hosted url";

const api: AxiosInstance = axios.create({ baseURL });

const getAllMovies = async (): Promise<GetAllMoviesResponse> => {
  try {
    const response = await api.get<GetAllMoviesResponse>("/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const createMovie = async (
  movie: Partial<Movie>
): Promise<CreateMovieResponse> => {
  try {
    const response = await api.post<CreateMovieResponse>("/movies/add", {
      movie,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

const getMovie = async (id: string): Promise<GetMovieResponse> => {
  try {
    const response = await api.post<GetMovieResponse>("/movies", { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};

const updateMovie = async (
  updatedMovie: Partial<Movie>
): Promise<UpdateMovieResponse> => {
  try {
    const response = await api.put<UpdateMovieResponse>("/movies/update", {
      movie: updatedMovie,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

const deleteMovie = async (id: string): Promise<DeleteMovieResponse> => {
  try {
    const response = await api.delete<DeleteMovieResponse>("/movies/delete", {
      data: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

const updateRating = async (
  id: string,
  rating: number
): Promise<UpdateRatingResponse> => {
  try {
    const response = await api.put<UpdateRatingResponse>(
      "/movies/update/rating",
      { id, rating }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};

const updateWatched = async (
  id: string,
  isWatched: boolean
): Promise<UpdateWatchedResponse> => {
  try {
    const response = await api.put<UpdateWatchedResponse>(
      "/movies/update/watched",
      { id, isWatched }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating watched status:", error);
    throw error;
  }
};

const addReview = async (
  id: string,
  review: string
): Promise<AddReviewResponse> => {
  try {
    const response = await api.put<AddReviewResponse>("/movies/add/review", {
      id,
      review,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  updateRating,
  updateWatched,
  addReview,
};
