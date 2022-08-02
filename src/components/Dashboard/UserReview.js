import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useGetUser from "../../customHook/getUser";
import auth from "../../firebase.init";
import Loading from "../shared/Loading/Loading";
import Review from "../shared/Review/Review";

const UserReview = () => {
  const [user] = useAuthState(auth);
  const [registeredUser] = useGetUser(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data: reviews, isLoading, refetch } = useQuery(["reviews"], () =>
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/review/${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  const onSubmit = (data) => {
    const { displayName, email } = user;
    const review = {
      name: displayName,
      email: email,
      image: registeredUser.img,
      message: data.review,
    };
    fetch("https://powerful-oasis-61993.herokuapp.com/mf/addReview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((userReview) => {
        if (userReview.acknowledged) {
          toast.success("You are successfully give review");
          reset();
          refetch();
        } else {
          toast.error("Your Review dose not stored");
        }
      });
  };
  
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-2xl text-center">Review</h2>
      <div className="flex justify-center">
      <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Write Your Review:</span>
          </label>
          <textarea
            type="text"
            {...register("review")}
            className="input input-bordered w-full max-w-xs textarea-ghost h-24 w-60"
          />
        </div>
        <input type="submit" className="btn btn-accent btn-sm mt-8 ml-2" value="submit" />
      </form>
      </div>
      <div>
        <h3 className="text-2xl text-center my-4 underline ">My Review</h3>
        <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {reviews?.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
