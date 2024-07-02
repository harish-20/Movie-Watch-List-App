import { useNavigate } from "react-router-dom";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import {
  createMovie,
  getMovie,
  updateMovie,
} from "../../service/movie.service";

import classes from "./AddMovieForm.module.css";

type FormData = {
  title: string;
  image: string;
  description: string;
  releaseYear: string;
  genre: string;
};

type FormErrors = {
  title?: string;
  image?: string;
  description?: string;
  releaseYear?: string;
  genre?: string;
};

type Field = {
  name: keyof FormData;
  label: string;
  type: "text" | "textarea";
  validation: (value: string) => string | null;
};

const fields: Field[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    validation: (value) => (value ? null : "Title is required"),
  },
  {
    name: "image",
    label: "Image URL",
    type: "text",
    validation: (value) => (value ? null : "Image URL is required"),
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    validation: (value) => (value ? null : "Description is required"),
  },
  {
    name: "releaseYear",
    label: "Year Of Release",
    type: "text",
    validation: (value) =>
      value
        ? /^\d{4}$/.test(value)
          ? null
          : "Year of release must be a valid year (e.g., 2023)"
        : "Year of release is required",
  },
  {
    name: "genre",
    label: "Genre",
    type: "text",
    validation: (value) => (value ? null : "Genre is required"),
  },
];

const AddMovieForm: React.FC<{ id?: string }> = ({ id }) => {
  const [movie, setMovie] = useState<Movie>();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
    description: "",
    releaseYear: "",
    genre: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      const { movie } = await getMovie(id);
      setMovie(movie);
      setFormData({
        title: movie.name,
        image: movie.image,
        description: movie.description,
        releaseYear: movie.yearOfRelease,
        genre: movie.genre,
      });
    };
    if (id) {
      fetchMovie(id);
    }
  }, [id]);

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    fields.forEach(({ name, validation }) => {
      const error = validation(formData[name]);
      if (error) {
        errors[name] = error;
      }
    });

    return errors;
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setFormErrors({});
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      if (id) {
        const { status } = await updateMovie({
          ...movie,
          description: formData.description,
          genre: formData.genre,
          name: formData.title,
          image: formData.image,
          yearOfRelease: formData.releaseYear,
        });
        if (status === "ok") {
          navigate(`/movie/${id}`);
        }
      } else {
        const { status, newId } = await createMovie({
          description: formData.description,
          genre: formData.genre,
          name: formData.title,
          image: formData.image,
          yearOfRelease: formData.releaseYear,
        });
        if (status === "ok") {
          navigate(`/movie/${newId}`);
        }
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form className={classes["add-movie-form"]} onSubmit={handleSubmit}>
      <h2>Movie Form</h2>
      {fields.map(({ name, label, type }) => (
        <div
          key={name}
          className={`${classes.input} ${
            formErrors[name] ? classes.error : ""
          }`}
        >
          <label htmlFor={name}>{label}</label>
          {type === "text" ? (
            <input
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          ) : (
            <textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              rows={6}
            />
          )}
          {formErrors[name] && (
            <p className={classes["error-text"]}>{formErrors[name]}</p>
          )}
        </div>
      ))}
      <div className={classes.actions}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default AddMovieForm;
