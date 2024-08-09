import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const role = Cookies.get("role");
  return <div className="flex"></div>;
};

export default AdminDashboard;
