import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading/Loading";
import EditProductModal from "./EditProductModal";

const EditProduct = () => {
  const { id } = useParams();
  const [openProductModal, setOpenProductModal] = useState({});
  const { data: service, isLoading, refetch } = useQuery(["service"], () =>
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/service/${id}`).then(
      (res) => res.json()
    )
  );
  if (isLoading) {
    return <Loading />;
  }
  const { name, image, description, price, available, minQty } = service;
  return (
    <div className="flex justify-center">
      <div className="card w-md-full bg-base-100 shadow-xl">
        <h3 className="text-2xl text-center font-bold">Manage Product</h3>
        <figure className="px-10 pt-10">
          <img src={image} alt={name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-secondary">{name}</h2>
          <p>{description}</p>
          <p>Available: {available}</p>
          <p>Price: ${price}/unit</p>
          <p>Minimum Order Quantity: {minQty}</p>
        </div>
        <label htmlFor="edit-product-modal" onClick={()=>setOpenProductModal(service)} className="btn btn-outline">Edit Service</label>
      </div>
      {openProductModal && <EditProductModal refetch={refetch} setOpenProductModal={setOpenProductModal} product={openProductModal} />}
    </div>
  );
};

export default EditProduct;
