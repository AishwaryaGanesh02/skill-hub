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
  const userid = Cookies.get("userid");
  const [designation, setDesignations] = useState({});
  const [skillData, setSkillData] = useState([]);
  const [averageData, setAverageData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [skillLevels, setSkillLevels] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch designation data
        const designationResponse = await axios.get(
          `http://localhost:1200/api/designation/${degnid}`
        );
        setDesignations(designationResponse.data);

        // Fetch user skill data
        const userSkillResponse = await axios.get(
          `http://localhost:1200/api/userskill/${userid}`
        );
        const userSkillsData = userSkillResponse.data;
        const userSkillIds = userSkillsData.map((skill) => skill.skillid);

        // Fetch skill details and averages
        const userSkillDetailsPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/skill/${skillId}`)
        );

        const avgPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/userskill/average/${skillId}`)
        );

        const [userSkillDetailsResponses, avgResponses] = await Promise.all([
          Promise.all(userSkillDetailsPromises),
          Promise.all(avgPromises),
        ]);

        const averageData = avgResponses.map((response) => response.data);
        setAverageData(averageData);

        const combinedSkillsData = userSkillDetailsResponses.map(
          (response) => ({
            ...response.data,
            level: userSkillsData.find(
              (skill) => skill.skillid === response.data.id
            ).level,
          })
        );

        const processedData = combinedSkillsData.map((data) => ({
          skill: data.name,
          level: data.level,
        }));
        setSkillData(processedData);

        // Calculate skill levels distribution
        const levelCounts = userSkillsData.reduce((acc, { level }) => {
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});
        setSkillLevels(levelCounts);

        // Fetch recently updated skills
        const skillDetailsMap = combinedSkillsData.reduce((acc, skill) => {
          acc[skill.id] = skill;
          return acc;
        }, {});

        const combinedData = userSkillsData.map((userSkill) => ({
          ...userSkill,
          skillDetails: skillDetailsMap[userSkill.skillid] || {},
        }));

        const sortedData = combinedData
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 5);
        setSkillsData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, degnid, userid]);

  return (
    <div className="w-full">
      <h1 className="font-extrabold text-21xl">{designation.name}</h1>
      <div className="w-full flex justify-start gap-12 items-center flex-wrap">
        <SkillLevel_BarChart skillData={skillData} averageData={averageData} />
        <LevelsCount_PieChart skillLevels={skillLevels} />
        <div className="">
          <Cards title="Your skills" content="80" />
          <Cards title="Required skills" content="100" />
        </div>
        <RecentlyUpdatedSkills_Table skillsData={skillsData} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
