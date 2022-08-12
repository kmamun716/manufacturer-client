import React, { useState } from "react";
import { toast } from 'react-toastify';

const EditProductModal = ({ product, refetch, setOpenProductModal }) => {
  const [editProduct, setEditProduct] = useState({
    available:'',
    minQty:'',
    price:''
  });
  const handleChange=e=>{
    setEditProduct({
        ...editProduct,
        [e.target.name]: e.target.value
    })
  }
  const handleSubmit=e=>{
    e.preventDefault();
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/edit/${product._id}`,{
        method: 'PUT',
        headers:{
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(editProduct)
    })
    .then(res=>res.json())
    .then(result=>{
        setOpenProductModal('');
        if(result.modifiedCount>0){
            refetch();
            toast.success('product update successfully')
        }else{
            toast.error('There have some proble')
        }
    })
  }
  return (
    <div>
      <input type="checkbox" id="edit-product-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-product-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center">{product.name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Qty: initial {product.available}</span>
              </label>
              <input
                type="number"
                name="available"
                placeholder="Type here"
                onChange={handleChange}
                defaultValue={product.available || ''}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Minimum Order Qty: initial {product.minQty}</span>
              </label>
              <input
                type="number"
                name="minQty"
                placeholder="Type here"
                onChange={handleChange}
                defaultValue={product.minQty || ''}
                className="input input-bordered w-full max-w-xs"
              />
            </div><div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Price: initial {product.price}</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Type here"
                onChange={handleChange}
                defaultValue={product.price || ''}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <p>Note: please type a value in every input box</p>
            <input className="btn btn-warning mt-2" type="submit" value="Submit" disabled={!editProduct.available || !editProduct.minQty || !editProduct.price}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
