import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation';
import Loading from '../shared/Loading/Loading';

const ManageOrder = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState({});
    const {data: orders, isLoading, refetch} = useQuery(['orders'],()=>fetch('https://powerful-oasis-61993.herokuapp.com/mf/orders').then(res=>res.json()))
    if(isLoading){
        return <Loading/>
    }
    const handleDelete=order=>{
        fetch(`https://powerful-oasis-61993.herokuapp.com/mf/orders/${order._id}`,{
        method: 'DELETE',
        headers:{
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.deletedCount>0){
            toast.success('Order is Deleted successfully');
            refetch()
        }else{
            toast.error('something wrong')
        }
    })
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
                  <label
                    htmlFor='delete-modal'
                    onClick={() => setOpenDeleteModal(order)}
                    className="btn btn-xs btn-warning"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openDeleteModal && (
          <DeleteConfirmation
            order={openDeleteModal}
            handleDelete={handleDelete}
          />
        )}
      </div>
        </div>
    );
};

export default ManageOrder;