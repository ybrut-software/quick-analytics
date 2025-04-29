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

// use case charts

export const TransactionVolumeChart = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Transaction Volume",
        data: [1200, 1900, 3000, 5000, 2200, 1800, 2500],
        borderColor: "#2634b970",
        backgroundColor: "#42a5f533",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Volume Over Time",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const TransactionSuccessChart = () => {
  const data = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Success vs. Failure",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export const RevenueByCardTypeChart = () => {
  const data = {
    labels: ["Credit Cards", "Debit Cards", "Prepaid Cards"],
    datasets: [
      {
        label: "Revenue (in INR)",
        data: [50000, 30000, 15000],
        backgroundColor: [
          "#3c48c0",
          "#515dc7",
          "#6771ce",
          "#7d85d5",
          "#929adc",
          "#a8aee3",
          "#bec2ea",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue by Card Type",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const FraudByRegionChart = () => {
  const data = {
    labels: ["unit 1", "unit 2", "unit 3", "unit 4", "unit 5", "unit 6"],
    datasets: [
      {
        label: "Fraud Cases",
        data: [300, 150, 400, 100, 50, 20],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fraudulent Transactions by Region",
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export const RevenueGrowthLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue Growth (INR)",
        data: [12000, 15000, 13786, 25000, 30000, 35000, 40000], // Sample revenue data
        borderColor: "#42A5F5", // Line color
        backgroundColor: "#42a5f533",
        fill: true, // Fill the area under the line
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Growth Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
        title: {
          display: true,
          text: "Revenue (INR)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const ClientInsightsLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Time period
    datasets: [
      {
        label: "cases",
        data: [120, 150, 180, 200, 240, 300, 350], // Active client data
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
      {
        label: "units",
        data: [15, 20, 25, 30, 40, 50, 60], // New clients data
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cases Insights Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cases",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const ClientsProgramsInsightsLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Time period
    datasets: [
      {
        label: "Active Clients",
        data: [120, 150, 180, 200, 240, 300, 350], // Active clients data
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
      {
        label: "Active Programs",
        data: [20, 25, 30, 40, 50, 60, 70], // Active programs data
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Clients and Programs Insights Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Clients/Programs",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const RulesInsightsLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Time period
    datasets: [
      {
        label: "Active Rules",
        data: [80, 85, 90, 95, 100, 110, 120], // Active rules data
        borderColor: "#42A5F5", // Line color for Active Rules
        backgroundColor: "rgba(66, 165, 245, 0.2)", // Fill color for Active Rules
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
      {
        label: "Inactive Rules",
        data: [20, 18, 15, 10, 12, 8, 5], // Inactive rules data
        borderColor: "#FF7043", // Line color for Inactive Rules
        backgroundColor: "rgba(255, 112, 67, 0.2)", // Fill color for Inactive Rules
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
      {
        label: "Rule Categories",
        data: [10, 12, 15, 18, 20, 22, 25], // Rule categories data
        borderColor: "#AB47BC", // Line color for Rule Categories
        backgroundColor: "rgba(171, 71, 188, 0.2)", // Fill color for Rule Categories
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
      {
        label: "Resolved Rules (Status)",
        data: [40, 50, 55, 65, 70, 80, 90], // Resolved rules data
        borderColor: "#66BB6A", // Line color for Resolved Rules
        backgroundColor: "rgba(102, 187, 106, 0.2)", // Fill color for Resolved Rules
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Rules, Categories, and Status Insights Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const ViolationCasesLineChart = () => {
  const data = {
    labels: [
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
      "Unit 5",
      "Unit 6",
      "Unit 7",
      "Unit 8",
      "Unit 9",
      "Unit 10",
      "Unit 11",
      "Unit 12",
      "Unit 13",
      "Unit 14",
    ],
    datasets: [
      {
        label: "Social Media Violations",
        data: [5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0],
        borderColor: "#42A5F5",
        backgroundColor: "#42a5f533",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Fake Recruitment",
        data: [1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0],
        borderColor: "#66BB6A",
        backgroundColor: "#66bb6a33",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Loss of Identity/Documents",
        data: [2, 0, 1, 3, 2, 0, 0, 1, 2, 0, 0, 3, 2, 0],
        borderColor: "#FFA726",
        backgroundColor: "#ffa72633",
        fill: true,
        tension: 0.3,
      },
      {
        label: "No of BOO conducted",
        data: [4, 1, 1, 3, 4, 1, 1, 3, 4, 1, 1, 3, 4, 1],
        borderColor: "#AB47BC",
        backgroundColor: "#ab47bc33",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Violation Cases Across Units",
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

export const ViolationCasesBarChart = () => {
  const data = {
    labels: [
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
      "Unit 5",
      "Unit 6",
      "Unit 7",
      "Unit 8",
      "Unit 9",
      "Unit 10",
      "Unit 11",
      "Unit 12",
      "Unit 13",
      "Unit 14",
    ],
    datasets: [
      {
        label: "Social Media Violations",
        data: [5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0],
        backgroundColor: "#42A5F5",
      },
      {
        label: "Fake Recruitment",
        data: [1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0],
        backgroundColor: "#66BB6A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Violation Cases Comparison (Bar Chart)",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const SocialMediaViolationsPieChart = () => {
  const data = {
    labels: [
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
      "Unit 5",
      "Unit 6",
      "Unit 7",
      "Unit 8",
      "Unit 9",
      "Unit 10",
      "Unit 11",
      "Unit 12",
      "Unit 13",
      "Unit 14",
    ],
    datasets: [
      {
        label: "Social Media Violations",
        data: [5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0],
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
      title: {
        display: true,
        text: "Social Media Violations Distribution",
      },
    },
  };

  return <Pie data={data} options={options} />;
};
