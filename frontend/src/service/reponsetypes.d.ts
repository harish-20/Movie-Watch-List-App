interface GetAllMoviesResponse {
  movies: Movie[];
}

interface GetMovieResponse {
  movie: Movie;
}

interface CreateMovieResponse {
  status: string;
  movies: Movie[];
  newId: string;
}

interface UpdateMovieResponse {
  status: string;
  movie: Movie;
}

interface DeleteMovieResponse {
  status: string;
}

interface UpdateRatingResponse {
  status: string;
  movie: Movie;
}

interface UpdateWatchedResponse {
  status: string;
  movie: Movie;
}

interface AddReviewResponse {
  status: string;
  movie: Movie;
}
