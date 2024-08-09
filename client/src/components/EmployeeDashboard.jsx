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
  const [reqdSkills, setReqdSkills] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch designation data
        const designationResponse = await axios.get(
          //users degn
          `http://localhost:1200/api/designation/${degnid}`
        );
        setDesignations(designationResponse.data);

        //all skills that user has
        const userSkillResponse = await axios.get(
          `http://localhost:1200/api/userskill/${userid}`
        );
        const userSkillsData = userSkillResponse.data;
        //user's skills id
        const userSkillIds = userSkillsData.map((skill) => skill.skillid);

        //user's skills info
        const userSkillDetailsPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/skill/${skillId}`)
        );
        // calculate average level of each skill
        const avgPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/userskill/average/${skillId}`)
        );

        const [userSkillDetailsResponses, avgResponses] = await Promise.all([
          Promise.all(userSkillDetailsPromises),
          Promise.all(avgPromises),
        ]);

        const averageData = avgResponses.map((response) => response.data);
        setAverageData(averageData);

        // joining level and skills name
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

        // list of levels in skills
        const levelCounts = userSkillsData.reduce((acc, { level }) => {
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});
        setSkillLevels(levelCounts);

        // recently updated skills
        const skillDetailsMap = combinedSkillsData.reduce((acc, skill) => {
          acc[skill.id] = skill;
          return acc;
        }, {});

        const combinedData = userSkillsData.map((userSkill) => ({
          ...userSkill,
          skillDetails: skillDetailsMap[userSkill.skillid] || {},
        }));
        // sort based on date and top 5
        const sortedData = combinedData
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 5);
        setSkillsData(sortedData);

        // list of skills with degn
        const userSkillsResponse = await axios.get(
          `http://localhost:1200/api/skill/degn/${degnid}`
        );
        setReqdSkills(userSkillsResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, degnid, userid]);

  return (
    <div className="w-full">
      <h1 className="font-extrabold text-21xl">{designation.name}</h1>
      <div className="my-12 sm:flex justify-around xs:block">
        <Cards title="Your skills" content={skillData.length} />
        <Cards title="Required skills" content={reqdSkills} />
      </div>
      <div className="mr-5 md:block lg:flex justify-start gap-12 items-center sm:block">
        <SkillLevel_BarChart skillData={skillData} averageData={averageData} />
        <LevelsCount_PieChart skillLevels={skillLevels} />
        <RecentlyUpdatedSkills_Table skillsData={skillsData} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
