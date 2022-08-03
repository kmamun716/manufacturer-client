import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const url ="https://api.imgbb.com/1/upload?key=1b6521bd0bd67a12328f7f6c0e209344";
    const onSubmit = data =>{
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image)
        fetch(url, {
            method: "POST",
            body: formData,
          })
        .then(res=>res.json())
        .then(result=>{
            const {name, details, price, minQty, available} = data;
            if(result.success){
                const image = result.data.url;
                const product = {
                    name,
                    description: details,
                    image, price, minQty, available
                }
                fetch('https://powerful-oasis-61993.herokuapp.com/mf/addProduct',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(product)
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.acknowledged){
                        toast(`product: ${name} added successfully on database`)
                        reset();
                    }
                })
            }else{
                toast.error('There Have Problem to Upload Photo')
            }
        })
    }
  return (
    <div>
      <h2 className="text-center text-2xl text-secondary">
        Add New Service
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product Name"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              type="text"              
              {...register("details", { required: true })}
              placeholder="Product Description"
              className="input input-bordered w-full max-w-xs h-32"
            />
            {errors.details && (
                <span className="text-red-500">Product Details is required</span>
              )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              type="Number"
              {...register("price", { required: true })}
              placeholder="Product Price"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.image && (
                <span className="text-red-500">Please Select an Image</span>
              )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Minimun Qty</span>
            </label>
            <input
              type="Number"
              {...register("minQty", { required: true })}
              placeholder="Product Min Qty"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.minQty && (
                <span className="text-red-500">Minimum Qty is required</span>
              )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Available Qty</span>
            </label>
            <input
              type="Number"
              {...register("available", { required: true })}
              placeholder="Product Availabel Qty"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.available && (
                <span className="text-red-500">Available Qty is required</span>
              )}
          </div>
          <input type="submit" className="btn btn-info my-2 text-white" value='Submit' />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
