import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../shared/Loading/Loading';

const ManageOrder = () => {
    const {data: orders, isLoading} = useQuery(['orders'],()=>fetch('https://powerful-oasis-61993.herokuapp.com/mf/orders').then(res=>res.json()))
    if(isLoading){
        return <Loading/>
    }
    const handleDelete=order=>{
        console.log(order)
    }
    return (
        <div>
            <h2 className="text-2xl text-center">All Orders</h2>
            <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Client</th>
              <th>Order</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.user}</td>
                <td>{order.serviceName}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order)}
                    className="btn btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default ManageOrder;