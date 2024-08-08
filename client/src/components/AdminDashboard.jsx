import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
// import SkillLevel_BarChart from "./UI Componts/SkillLevel_BarChart";
// import LevelsCount_PieChart from "./UI Componts/LevelsCount_PieChart";
// import RecentlyUpdatedSkills_Table from "./UI Componts/RecentlyUpdatedSkills_Table";
const AdminDashboard = () => {
  const role = Cookies.get("role");
  return (
    <div className="flex">
      {/* <SkillLevel_BarChart />
      <LevelsCount_PieChart />
      <RecentlyUpdatedSkills_Table /> */}
    </div>
  );
};

export default AdminDashboard;
