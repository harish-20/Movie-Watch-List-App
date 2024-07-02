import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import classes from "./Reviews.module.css";

type ReviewsProps = {
  reviews: string[];
  onAddReview: (review: string) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [review, setReview] = useState("");

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { value } = event.target;
    setReview(value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (review) {
      onAddReview(review);
      setReview("");
    }
  };

  return (
    <div className={classes["reviews-section"]}>
      <form className={classes["add-review-form"]} onSubmit={handleSubmit}>
        <div className={classes.input}>
          <label htmlFor="review">Enter Your Review</label>
          <textarea rows={6} value={review} onChange={handleChange} />
        </div>

        <div>
          <button>Submit</button>
        </div>
      </form>

      <div className={classes.reviews}>
        {reviews.map((review, index) => (
          <div className={classes.review} key={index}>
            {review}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
