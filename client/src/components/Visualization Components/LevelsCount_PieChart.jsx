import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import Cookie from "js-cookie";

const LevelsCount_PieChart = () => {
  const userid = Cookie.get("userid");
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSkillResponse = await axios.get(
          `http://localhost:1200/api/userSkill/${userid}`
        );
        const userSkillsData = userSkillResponse.data;

        const levelCounts = userSkillsData.reduce((acc, { level }) => {
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(levelCounts).map(
          (level) => ["Begginer", "Intermediate", "Advanced"][level - 1]
        );
        const series = Object.values(levelCounts);

        setChartOptions({
          series,
          options: {
            chart: {
              type: "pie",
              width: 380,
            },
            labels,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  return (
    <div id="chart">
      <h1 className="font-bold text-2xl">Skill Levels Distribution</h1>
      <ApexCharts
        options={chartOptions.options}
        series={chartOptions.series}
        type="pie"
        width={500}
      />
    </div>
  );
};

export default LevelsCount_PieChart;
