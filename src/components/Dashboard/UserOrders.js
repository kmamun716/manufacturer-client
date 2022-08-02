import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from '../shared/Loading/Loading';

const UserOrders = () => {
  const [user] = useAuthState(auth);
  const { data: orders, refetch, isLoading } = useQuery(["orders"], () =>
    fetch(`http://localhost:4000/mf/orders/${user?.email}`,{
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) =>
      res.json()
    )
  );
  const handleDelete =id=>{
    fetch(`http://localhost:4000/mf/orders/${id}`,{
        method: 'DELETE'
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.deletedCount>0){
            toast.success('Your Order is Deleted');
            refetch();
        }else{
            toast.error('something wrong')
        }
    })
  }
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      <h2 className="text-2xl text-center">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Order Name</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                orders?.map((order, index)=><tr key={order._id}>
                    <th>{index+1}</th>
                    <td>{order.serviceName}</td>
                    <td>{order.user}</td>
                    <td>{order.qty}</td>
                    <td>${order.price}</td>
                    <td><button onClick={()=>handleDelete(order._id)} className="btn btn-xs">Delete</button></td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
