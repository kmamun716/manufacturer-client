import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../shared/Loading/Loading';

const ManageProduct = () => {
    const {
        data: services,
        isLoading,
      } = useQuery(["services"], () =>
        fetch(
          `https://powerful-oasis-61993.herokuapp.com/mf/services`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        ).then((res) => res.json())
      );
      if(isLoading){
        return <Loading/>
      }
    return (
        <div>
            <h2 className='text-2xl text-center'>All Order</h2>
            <div>
            <table className="table w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Service Name</th>
              <th>Min Order Qty</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, index) => (
              <tr key={service._id}>
                <th>{index + 1}</th>
                <td>{service.name}</td>
                <td>{service.minQty}</td>
                <td>{service.available}</td>
                <td>${service.price}</td>
                <td><Link
                    className="btn btn-xs btn-secondary"
                    to={`/dashboard/edit-product/${service._id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <label
                    htmlFor="delete-modal"
                    className="btn btn-xs btn-warning"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </div>
    );
};

export default ManageProduct;