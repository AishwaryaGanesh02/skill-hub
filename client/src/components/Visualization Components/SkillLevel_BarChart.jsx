import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const Skills_BarChart = ({ skillData, averageData }) => {
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
    const processedData = skillData.map((data) => ({
      skill: data.skill,
      level: data.level,
    }));

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
  }, [skillData, averageData]);
  console.log(chartOptions);
  return (
    <div id="chart">
      <h1 className="text-center font-bold text-2xl">
        Skill Proficiency Overview
      </h1>
      <ApexCharts
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={500}
        width={500}
      />
    </div>
  );
};

export default Skills_BarChart;
