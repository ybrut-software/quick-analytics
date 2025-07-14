import {
  Chart as ChartJS,
  registerables,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line, Bar, Doughnut, Pie, Radar } from "react-chartjs-2";

ChartJS.register(...registerables);

const colors = [
  "#000000", // Black
  "#1a1a1a", // Very Dark Grey
  "#333333", // Dark Grey
  "#4d4d4d", // Medium-Dark Grey
  "#666666", // Medium Grey
  "#808080", // Normal Grey
  "#999999", // Light Grey
  "#b3b3b3", // Lighter Grey
  "#cccccc", // Very Light Grey
  "#e6e6e6", // Almost White Grey
  "#f2f2f2", // Near White
  "#ffffff", // Pure White (optional if needed)
];

const COLORS = [
  { border: "#42A5F5", background: "#42a5f533" },
  { border: "#66BB6A", background: "#66bb6a33" },
  { border: "#FFA726", background: "#ffa72633" },
  { border: "#AB47BC", background: "#ab47bc33" },
  { border: "#EF5350", background: "#ef535033" },
  { border: "#26C6DA", background: "#26c6da33" },
  { border: "#7E57C2", background: "#7e57c233" },
  { border: "#D4E157", background: "#d4e15733" },
];

export const LineChart = ({ ...props }) => {
  return <Line {...props} />;
};

export const BarChart = ({ ...props }) => {
  return <Bar {...props} />;
};

export const DoughnutChart = ({ ...props }) => {
  return (
    <Doughnut
      {...props}
      options={{
        legend: {
          display: true,
          position: "bottom",
        },
      }}
    />
  );
};

export const CasePieChart = ({ data, unit }) => {
  const caseCounts = data[unit]?.caseCounts || 0;
  const labels = Object.keys(caseCounts) || [];
  const values = Object.values(caseCounts) || [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Case Distribution",
        data: values,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#26C6DA",
          "#EF5350",
          "#8D6E63",
          "#FFCA28",
          "#26A69A",
          "#7E57C2",
          "#789262",
          "#5C6BC0",
          "#F06292",
          "#FF7043",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Cases in {unit}
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export const CaseCountPieChart = ({ caseData = {} }) => {
  if (!caseData || Object.keys(caseData).length === 0)
    return <p>No case data available.</p>;

  const labels = Object.keys(caseData);
  const values = Object.values(caseData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Case Count",
        data: values,
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#f87171",
          "#fbbf24",
          "#a78bfa",
          "#fb7185",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Total Cases Overview
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export const CasesAcrossUnitsBarChart = ({ data: propData }) => {
  // Extract unit names
  const units = Object.keys(propData);

  // Extract all unique case types from the data
  const caseTypes = [
    ...new Set(
      Object.values(propData).flatMap((unit) => Object.keys(unit.caseCounts))
    ),
  ];

  // Generate datasets dynamically based on case types
  const datasets = caseTypes.map((caseType, index) => {
    const color = COLORS[index % COLORS.length]; // Cycle through colors if needed
    return {
      label: caseType, // Use case type as label
      data: units.map((unit) => propData[unit].caseCounts[caseType] || 0), // Data for each unit
      borderColor: color.border,
      backgroundColor: color.background,
      fill: true,
      tension: 0.3,
    };
  });

  const data = {
    labels: units,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Cases Across Units",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Units",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const CasesAcrossUnitsLineChart = ({ data: propData }) => {
  // Extract unit names
  const units = Object.keys(propData);

  // Extract all unique case types from the data
  const caseTypes = [
    ...new Set(
      Object.values(propData).flatMap((unit) => Object.keys(unit.caseCounts))
    ),
  ];

  // Generate datasets dynamically based on case types
  const datasets = caseTypes.map((caseType, index) => {
    const color = COLORS[index % COLORS.length]; // Cycle through colors if needed
    return {
      label: caseType, // Use case type as label
      data: units.map((unit) => propData[unit].caseCounts[caseType] || 0), // Data for each unit
      borderColor: color.border,
      backgroundColor: color.background,
      fill: true,
      tension: 0.3,
    };
  });

  const data = {
    labels: units,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Cases Across Units",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Units",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const CasesForUnitLineChart = ({ data: propData, unit = "" }) => {
  // Determine units to display based on the unit prop
  const units = unit && propData[unit] ? [unit] : Object.keys(propData);

  // Extract all unique case types from the data (considering all units for consistency)
  const caseTypes = [
    ...new Set(
      Object.values(propData).flatMap((unitData) =>
        Object.keys(unitData.caseCounts)
      )
    ),
  ];

  // Generate datasets dynamically based on case types
  const datasets = caseTypes.map((caseType, index) => {
    const color = COLORS[index % COLORS.length]; // Cycle through colors
    return {
      label: caseType, // Use case type as label
      data: units.map((unit) => propData[unit].caseCounts[caseType] || 0), // Data for selected unit(s)
      borderColor: color.border,
      backgroundColor: color.background,
      fill: true,
      tension: 0.3,
    };
  });

  const data = {
    labels: units, // Single unit or all units
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: unit ? `Total Cases for ${unit}` : "Total Cases Across Units",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Units",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const CasesForUnitBarChart = ({ data: propData, unit = "" }) => {
  // Determine units to display based on the unit prop
  const units = unit && propData[unit] ? [unit] : Object.keys(propData);

  // Extract all unique case types from the data (considering all units for consistency)
  const caseTypes = [
    ...new Set(
      Object.values(propData).flatMap((unitData) =>
        Object.keys(unitData.caseCounts)
      )
    ),
  ];

  // Generate datasets dynamically based on case types
  const datasets = caseTypes.map((caseType, index) => {
    const color = COLORS[index % COLORS.length]; // Cycle through colors
    return {
      label: caseType, // Use case type as label
      data: units.map((unit) => propData[unit].caseCounts[caseType] || 0), // Data for selected unit(s)
      borderColor: color.border,
      backgroundColor: color.background,
      fill: true,
      tension: 0.3,
    };
  });

  const data = {
    labels: units, // Single unit or all units
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: unit ? `Cases for ${unit}` : "Cases Across Units",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Units",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
