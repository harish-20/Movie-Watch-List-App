import { useParams } from "react-router-dom";
import React from "react";

import AddMovieForm from "../components/AddMovieForm/AddMovieForm";

const AddMovie: React.FC = () => {
  const { id } = useParams();

  return <AddMovieForm id={id} />;
};

export default AddMovie;
