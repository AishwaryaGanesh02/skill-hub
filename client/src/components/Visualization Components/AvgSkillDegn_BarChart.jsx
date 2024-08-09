import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const AvgSkillDegn_BarChart = ({ designationData }) => {
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
        text: "designation",
      },
    },
    yaxis: {
      title: {
        text: "Average Skill Level",
      },
      labels: {
        formatter: (val) =>
          ["Beginner", "Intermediate", "Advanced"][val - 1] || val,
      },
      tickAmount: 3,
    },
  });

  useEffect(() => {
    const designations = designationData.map((data) => data.designation);
    const avgSkillLevels = designationData.map((data) =>
      data.averageSkillLevel.toFixed(2)
    );
    setChartOptions({
      series: [
        {
          name: "Average Skill Level",
          data: avgSkillLevels,
        },
      ],
      xaxis: {
        categories: designations,
        title: {
          text: "Designations",
        },
      },
      yaxis: {
        title: {
          text: "Average Skill Level",
        },
        labels: {
          formatter: (val) =>
            ["Beginner", "Intermediate", "Advanced"][val - 1] || val,
        },
        tickAmount: 3,
      },
    });
  }, [designationData]);

  return (
    <div id="chart">
      <h1 className="text-center font-bold text-2xl">
        Average Skill Level by designation
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

export default AvgSkillDegn_BarChart;
