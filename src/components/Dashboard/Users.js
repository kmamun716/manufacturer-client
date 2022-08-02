import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../shared/Loading/Loading";

const Users = () => {
  const [currentUser] = useAuthState(auth);
  const { data, isLoading } = useQuery(["users"], () =>
    fetch("https://powerful-oasis-61993.herokuapp.com/mf/allUser").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  const handleChangeRole = (email, role) => {
    const userRole = { role: "user" };
    const adminRole = { role: "admin" };
    fetch(`https://powerful-oasis-61993.herokuapp.com/mf/userRole/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(role === "admin" ? userRole : adminRole),
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData)
        if (userData.result.modifiedCount > 0) {
          toast.success(`Role Change successfully`);
        } else {
          toast.error("Failed to change Role");
        }
      });
  };
  const handleDelete = (user) => {
    console.log(user);
  };
  return (
    <div>
      <h2 className="text-2xl text-center">All User</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    currentUser.email !== user.email && (
                      <button
                        onClick={() => handleChangeRole(user.email, "user")}
                      >
                        Make User
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleChangeRole(user.email, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default Users;
