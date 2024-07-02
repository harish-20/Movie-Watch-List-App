let movies = require("../data/movie");

const getAllMovies = async (req, res) => {
  try {
    res.send({ movies });
  } catch (err) {
    res.status(404).send({ err: "cannot get movies" });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const movie = movies.find((movie) => movie.id === id);

    if (movie) {
      res.status(200).send({ movie });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const createMovie = async (req, res) => {
  try {
    const { movie } = req.body;
    const newId = Date.now().toString();
    movies.push({ id: newId, ...movie });
    res.status(200).send({ status: "ok", movies, newId });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movie: updatedMovie } = req.body;
    const movieIndex = movies.findIndex(
      (movie) => movie.id === updatedMovie.id
    );

    if (movieIndex !== -1) {
      movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
      res.status(200).send({ status: "ok", movie: movies[movieIndex] });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const movie = movies.find((movie) => movie.id === id);

    if (movie) {
      movies = movies.filter((movie) => movie.id !== id);
      res.status(200).send({ status: "ok" });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const updateRating = async (req, res) => {
  try {
    const { id, rating } = req.body;
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex !== -1) {
      movies[movieIndex].rating = rating;
      res.status(200).send({ status: "ok", movie: movies[movieIndex] });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const updateWatched = async (req, res) => {
  try {
    const { id, isWatched } = req.body;
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex !== -1) {
      movies[movieIndex].isWatched = isWatched;
      res.status(200).send({ status: "ok", movie: movies[movieIndex] });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

const addReview = async (req, res) => {
  try {
    const { id, review } = req.body;
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex !== -1) {
      movies[movieIndex].review.push(review);
      res.status(200).send({ status: "ok", movie: movies[movieIndex] });
    } else {
      res.status(404).send({ err: "movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
  updateRating,
  updateWatched,
  addReview,
};
