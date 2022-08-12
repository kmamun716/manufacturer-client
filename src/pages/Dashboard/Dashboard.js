import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useGetUser from "../../customHook/getUser";
import auth from "../../firebase.init";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [registeredUser] = useGetUser(user);
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h2 className="text-2xl font-bold text-purple-500 text-center">Dashboard</h2>
        <p className="text-2xl text-end mr-10">Welcome, {user?.displayName}</p>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul tabIndex='1' className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li> <Link to="/dashboard">My Profile</Link></li>
          {registeredUser?.role !== "admin" && (
            <>
              <li><Link to="/dashboard/my-order">My Orders</Link></li>
              <li><Link to="/dashboard/my-review">My Review</Link></li>
            </>
          )}
          {
            registeredUser?.role === "admin" && <>
              <li><Link to="/dashboard/users">Users</Link></li>
              <li><Link to="/dashboard/add-product">Add Product</Link></li>
              <li><Link to="/dashboard/manage">Manage Orders</Link></li>
              <li><Link to="/dashboard/manage-product">Manage Product</Link></li>
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
