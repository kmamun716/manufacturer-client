import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({service}) => {
    const navigate = useNavigate();
    const {_id, name, image, price, description} = service;
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description.slice(0,100)} ....</p>
        <p>Price: start from <span className="text-accent">${price}</span></p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>navigate(`/order-now/${_id}`)}>Order Page</button>
        </div>
      </div>
    </div>
  );
};

export default Service;
