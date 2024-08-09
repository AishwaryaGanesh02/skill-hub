import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const EmployeeSkillLevel_PieChart = ({ employeeSkillLevels }) => {
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
    const labels = Object.keys(employeeSkillLevels).map(
      (level) => ["Beginner", "Intermediate", "Advanced"][level - 1]
    );
    const series = Object.values(employeeSkillLevels);

    setChartOptions({
      series,
      options: {
        chart: {
          type: "pie",
          width: 380,
        },
        labels,
        plotOptions: {
          pie: {
            donut: {
              size: "60%",
            },
          },
        },
        legend: {
          position: "bottom",
        },
        dataLabels: {
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    });
  }, [employeeSkillLevels]);

  return (
    <div id="chart">
      <h1 className="text-center font-bold text-2xl">
        Employee Skill Levels Distribution
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

export default EmployeeSkillLevel_PieChart;
