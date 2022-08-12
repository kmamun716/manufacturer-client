import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/shared/Loading/Loading";
import auth from "../../firebase.init";

const Parchage = () => {
  const [user] = useAuthState(auth);
  const [resend, setResend] = useState(false);
  const [service, setService] = useState({});
  const [minQty, setMinQty] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/service/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setMinQty(data.minQty);
      });
  }, [id, resend]);
  const handleIncrease = () => {
    const qty = service.minQty + 1;
    setService({ ...service, minQty: qty });
  };
  const handleDecrease = () => {
    const qty = service.minQty - 1;
    setMinQty(qty);
    setService({ ...service, minQty: qty });
  };
  const handleOrder = () => {
    const order = {
      user: user?.displayName,
      email: user?.email,
      serviceId: service?._id,
      serviceName: service?.name,
      qty: service?.minQty,
      unitPrice: service?.price,
      price: service?.minQty * service?.price,
    };
    fetch("https://powerful-oasis-61993.herokuapp.com/mf/createOrder/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(`Order Successfully, order id is: ${data.insertedId}`);
          fetch(`https://powerful-oasis-61993.herokuapp.com/mf/availableQty`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              qty: service.minQty,
              serviceId: service._id,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.modifiedCount > 0) {
                setResend(!resend);
              }
            });
        } else {
          toast.error("there have some problem in your order");
        }
      });
  };
  if (!service.name) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center">
      <div className="card w-md-full bg-base-100 shadow-xl">
        <p className="text-center text-3xl font-bold">Your Slected Item:</p>
        <figure className="px-10 pt-10">
          <img src={service.image} alt={service.name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-secondary">{service.name}</h2>
          <p>{service.description}</p>
          <p>
            Qty:{" "}
            <button
              onClick={handleDecrease}
              className="btn btn-info btn-xs"
              disabled={service.minQty <= minQty}
            >
              -
            </button>{" "}
            {service.minQty}{" "}
            <button
              onClick={handleIncrease}
              className="btn btn-accent btn-xs"
              disabled={service.minQty >= service.available}
            >
              +
            </button>
          </p>
          <p>Available: {service.available}</p>
          <p>Price: ${service.price}/unit</p>
          <div className="card-actions">
            <button onClick={handleOrder} className="btn btn-primary">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parchage;
