import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({order}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [cardSuccess, setCardSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState('');

  const {user, email, price} = order;

  useEffect(()=>{
    fetch('http://localhost:4000/mf/payment',{
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify({price: price})
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.clientSecret){
        setClientSecret(result.clientSecret)
      }
    })
  },[price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (elements === null) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
      setCardSuccess('')
    } else {
      setCardError("");
    }
    //confirm card payment
    const {paymentIntent, error: paymentError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user,
            email,
          },
        },
      },
    );
    if(paymentError){
      setCardError(paymentError.message);
      setCardSuccess('');
    }else{
      setCardError('');
      setCardSuccess('Congrats! Your Payment is completed');
      setTransactionId(paymentIntent.id);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-sm btn-accent" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      {
        cardError && <p className="text-red-500 text-bold">{cardError}</p>
      }
      {
        cardSuccess && <div>
          <p className="text-green-500 text-bold">{cardSuccess}</p>
          <p>Your Transaction Id: <span className="text-orange-500 font-bold">{transactionId && transactionId}</span></p>
        </div>
      }
    </>
  );
};

export default CheckoutForm;
