import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const LevelsCount_PieChart = ({ skillLevels }) => {
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
    const labels = Object.keys(skillLevels).map(
      (level) => ["Beginner", "Intermediate", "Advanced"][level - 1]
    );
    const series = Object.values(skillLevels);

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
  }, [skillLevels]);

  return (
    <div id="chart">
      <h1 className="text-center font-bold text-2xl">
        Skill Levels Distribution
      </h1>
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
