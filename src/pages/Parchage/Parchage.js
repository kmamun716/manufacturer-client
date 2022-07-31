import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Parchage = () => {
  const [service, setService] = useState({});
  const [minQty, setMinQty] = useState(0);
  const { id } = useParams();
  useEffect(()=>{
    fetch(`http://localhost:4000/mf/service/${id}`)
    .then((res) => res.json())
    .then(data=>{
      setService(data)
      setMinQty(data.minQty)
    })
  },[id])
  const handleIncrease=()=>{
    const qty = service.minQty + 1;
    setService({...service, minQty : qty})
  }
  const handleDecrease=()=>{
    const qty = service.minQty - 1;
    setMinQty(qty)
    setService({...service, minQty : qty})
  }
  console.log(service)
  return (
    <div className="flex justify-center">
      <div className="card w-md-full bg-base-100 shadow-xl">
        <p className="text-center text-3xl font-bold">Your Slected Item:</p>
      <figure className="px-10 pt-10">
        <img
          src={service.image}
          alt={service.name}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{service.name}</h2>
        <p>{service.description}</p>
        <p>Qty: <button onClick={handleDecrease} className="btn btn-info btn-xs" disabled={service.minQty<=minQty}>-</button> {service.minQty} <button onClick={handleIncrease} className="btn btn-accent btn-xs" disabled={service.minQty>=service.available}>+</button></p>
        <p>Available: {service.available}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Order Now</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Parchage;
