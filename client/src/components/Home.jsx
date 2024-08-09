import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
const Dashboard = () => {
  const role = Cookies.get("role");
  return (
    <div className="">
      <Sidebar />
      <div className="m-3 xs:ml-42 sm:ml-42 md:ml-60 lg:ml-60">
        {role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
