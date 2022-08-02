import React from "react";

const Review = ({ review }) => {
  const { name, image, message } = review;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div className="card-body flex flex-row">
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={image} alt={name} />
          </div>
        </div>
        <div>
        <div>
        <p><span className="text-xl">{name}</span> said,</p>
        </div>
        <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
