import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SkillLevel_BarChart from "./Visualization Components/SkillLevel_BarChart";
import LevelsCount_PieChart from "./Visualization Components/LevelsCount_PieChart";
import RecentlyUpdatedSkills_Table from "./Visualization Components/RecentlyUpdatedSkills_Table";
import Cards from "./Visualization Components/Cards";
const EmployeeDashboard = () => {
  const role = Cookies.get("role");
  const degnid = Cookies.get("degnid");
  const [designation, setDesignations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/designation/${degnid}`
        );
        setDesignations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, degnid]);

  return (
    <div className="w-full">
      <h1 className="font-extrabold text-21xl">{designation.name}</h1>
      <div className="flex justify-start gap-12 items-center flex-wrap">
        <SkillLevel_BarChart />
        <LevelsCount_PieChart />
        <div className="">
          <Cards title="Your skills" content="80" />
          <Cards title="Required skills" content="100" />
        </div>
        <RecentlyUpdatedSkills_Table />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
