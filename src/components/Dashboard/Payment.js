import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_57msieEJ1KP1lE1knSx1q7zs00kmtdUwh3");

const Payment = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["order"], () =>
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/getOrder/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="card max-w-md w-50 bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title">{data?.serviceName}</h2>
          <p>Unit Price: ${data?.unitPrice}</p>
          <p>Orderd Qty: {data?.qty}</p>
          <p>Please Pay: ${data?.price}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={data}/>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
