const router = require("express").Router();

const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  updateRating,
  updateWatched,
  addReview,
} = require("../controller");

router.get("/movies", getAllMovies);
router.post("/movies", getMovie);
router.post("/movies/add", createMovie);
router.put("/movies/update", updateMovie);
router.delete("/movies/delete", deleteMovie);
router.put("/movies/update/rating", updateRating);
router.put("/movies/update/watched", updateWatched);
router.put("/movies/add/review", addReview);

module.exports = router;
