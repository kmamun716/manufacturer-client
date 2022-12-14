import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import DeleteConfirmation from "../shared/DeleteConfirmation/DeleteConfirmation";
import Loading from "../shared/Loading/Loading";

const UserOrders = () => {
  const [user] = useAuthState(auth);
  const [openDeleteModal, setOpenDeleteModal] = useState({});
  const {
    data: orders,
    refetch,
    isLoading,
  } = useQuery(["orders"], () =>
    fetch(
      `https://powerful-oasis-61993.herokuapp.com/mf/orders/${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );
  const handleDelete = (id) => {
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/orders/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          toast.success("Your Order is Deleted");
          refetch();
        } else {
          toast.error("something wrong");
        }
      });
  };
  if (isLoading) {
    return <Loading />;
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
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.serviceName}</td>
                <td>{order.user}</td>
                <td>{order.qty}</td>
                <td>${order.price}</td>
                <td>
                  {order.paid?<p className="text-xl text-center">Paid</p>:<Link
                    className="btn btn-xs btn-secondary"
                    to={`/dashboard/payment/${order._id}`}
                  >
                    Pay
                  </Link>}
                </td>
                <td>
                  <label
                    htmlFor="delete-modal"
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

export default UserOrders;
