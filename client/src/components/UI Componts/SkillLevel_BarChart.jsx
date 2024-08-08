import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import Coookie from "js-cookie";

const processSkillsData = (userSkills) => {
  const skillLevels = {};

  userSkills.forEach((userSkill) => {
    const skillName = userSkill.name;
    if (!skillLevels[skillName]) {
      skillLevels[skillName] = 0;
    }
    skillLevels[skillName] += userSkill.level;
  });

  return Object.keys(skillLevels).map((skill) => ({
    skill,
    level: skillLevels[skill],
  }));
};

const Skills_BarChart = () => {
  const userid = Coookie.get("userid");
  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      type: "bar",
      height: 500,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },

    xaxis: {
      categories: [],
      title: {
        text: "Skill",
      },
    },
    yaxis: {
      title: {
        text: "Skill Level",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSkillResponse = await axios.get(
          `http://localhost:1200/api/userskill/${userid}`
        );
        const userSkillsData = userSkillResponse.data;
        // array of {id: 9, userid: 3, skillid: 5, createdAt: '2024-08-08T05:42:44.572Z', updatedAt: '2024-08-08T05:42:44.572Z', …}
        const userSkillIds = userSkillsData.map((skill) => skill.skillid);

        const userSkillDetailsPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/skill/${skillId}`)
        );

        const avgPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/userskill/average/${skillId}`)
        );

        const userSkillDetailsResponses = await Promise.all(
          userSkillDetailsPromises
        );
        const avgResponses = await Promise.all(avgPromises);

        const averageData = avgResponses.map((data) => data.data);

        const combinedSkillsData = userSkillDetailsResponses.map(
          (response) => ({
            ...response.data,
            level: userSkillsData.find(
              (skill) => skill.skillid === response.data.id
            ).level,
          })
        );
        const processedData = processSkillsData(combinedSkillsData);

        setChartOptions({
          series: [
            {
              name: "Skill Level",
              data: processedData.map((data) => data.level),
            },
            {
              name: "Average Skill Level",
              data: averageData,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: processedData.map((data) => data.skill),
            title: {
              text: "Skills",
            },
          },
          yaxis: {
            title: {
              text: "Skill Level",
            },
            labels: {
              formatter: (val) =>
                ["Beginner", "Intermediate", "Advanced"][val - 1] || val,
            },
            tickAmount: 3,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <h1 className="font-bold text-2xl">Skill Proficiency Overview</h1>
      <ApexCharts
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={500}
      />
    </div>
  );
};

export default Skills_BarChart;
// add another bar for each skill that represents the average of other in that skill
