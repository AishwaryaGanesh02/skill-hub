import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const RecentlyUpdatedSkills_Table = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const userid = Cookie.get("userid");
        const userresponse = await axios.get(
          `http://localhost:1200/api/userskill/${userid}`
        );
        const userData = userresponse.data;
        const userSkillIds = userData.map((skill) => skill.skillid);

        const userSkillDetailsPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/skill/${skillId}`)
        );
        const userSkillDetailsResponses = await Promise.all(
          userSkillDetailsPromises
        );
        const skillsData = userSkillDetailsResponses.map(
          (skills) => skills.data
        );

        const skillDetailsMap = skillsData.reduce((acc, skill) => {
          acc[skill.id] = skill;
          return acc;
        }, {});

        const combinedData = userData.map((userskills) => ({
          ...userskills,
          skillDetails: skillDetailsMap[userskills.skillid] || {},
        }));

        combinedData
          .sort(function (a, b) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          })
          .slice(0, 5);
        setSkillsData(combinedData);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    // array.sort(function(a,b){
    //     // Turn your strings into dates, and then subtract them
    //     // to get a value that is either negative, positive, or zero.
    //     return new Date(b.date) - new Date(a.date);
    //   });
    fetchSkillsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="font-bold text-2xl">Recently Updated Skills</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Skill Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill) => (
            <tr key={skill.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {skill.skillDetails.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {["Beginner", "Intermediate", "Advanced"][skill.level - 1]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(skill.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyUpdatedSkills_Table;
