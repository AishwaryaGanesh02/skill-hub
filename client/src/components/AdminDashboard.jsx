import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import AvgSkillDegn_BarChart from "./Visualization Components/AvgSkillDegn_BarChart";
import EmployeeSkillLevel_PieChart from "./Visualization Components/EmployeeSkillLevel_PieChart";
import EmpDeptLevel_BarChart from "./Visualization Components/EmpDeptLevel_BarChart";
import TopDesignation_Table from "./Visualization Components/TopDesignation_Table";
import Cards from "./Visualization Components/Cards";
import axios from "axios";

const AdminDashboard = () => {
  const role = Cookies.get("role");
  const degnid = Cookies.get("degnid");
  const userid = Cookies.get("userid");
  const [employeeSkillLevels, setEmployeeSkillLevels] = useState([]);
  const [userAvgDesg, setUserAvgDesg] = useState([]);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDesignations, setTotalDesignations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAvgDesgRes = await axios.get(
          `http://localhost:1200/api/userskill/user-avg-degn`
        );
        setUserAvgDesg(userAvgDesgRes.data);

        const countLevel = await axios.get(
          `http://localhost:1200/api/userskill/count-level`
        );

        setEmployeeSkillLevels(countLevel.data);

        const totD = await axios.get(`http://localhost:1200/api/designations`);
        setTotalDesignations(totD.data.length);

        const totS = await axios.get(`http://localhost:1200/api/skill`);
        setTotalSkills(totS.data.length);

        const totE = await axios.get(`http://localhost:1200/api/user`);
        setTotalEmployees(totE.data.length - 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, degnid, userid]);

  return (
    <div className="w-full">
      <h1 className="font-extrabold text-21xl">Dashboard</h1>
      <div className="my-12 sm:flex justify-around xs:block">
        <Cards title="Total Employees" content={totalEmployees} />
        <Cards title="Total Designations" content={totalDesignations} />
        <Cards title="Total Skills" content={totalSkills} />
      </div>
      <div className="mr-5 md:block lg:flex justify-around gap-12 items-center sm:block">
        <AvgSkillDegn_BarChart designationData={userAvgDesg} />
        <EmployeeSkillLevel_PieChart
          employeeSkillLevels={employeeSkillLevels}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
