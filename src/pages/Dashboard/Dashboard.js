import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <h2 className="text-2xl font-bold text-purple-500">Welcome to Dashboard</h2>
        <Outlet/>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to='/dashboard/my-profile'>My Profile</Link>
          </li>
          <li>
            <Link to='/dashboard/my-order'>My Orders</Link>
          </li>
          <li>
            <Link to='/dashboard/my-review'>My Review</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
