import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../shared/Loading/Loading";
import Review from "../../shared/Review/Review";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery(["reviews"], () =>
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/review`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-3xl text-center font-bold my-4">User Reviews</h2>
      <div className="grid grid-cols-4 gap-2">
        {reviews.slice(0, 4).map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
