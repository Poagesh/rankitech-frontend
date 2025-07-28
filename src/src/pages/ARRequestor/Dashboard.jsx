import React from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import MatchResultTable from "@/components/MatchResultTable/MatchResultTable";

const status = "In Progress";
const topMatches = [
  { id: 1, name: "Alice Singh", score: 0.93 },
  { id: 2, name: "Bob Das", score: 0.89 },
  { id: 3, name: "Carol Roy", score: 0.85 }
];

const Dashboard = () => (
  <div>
    <h1>JD Comparison Status: {status}</h1>
    <ProgressBar progress={status === "Completed" ? 100 : 65} />
    <h2>Top 3 Matches</h2>
    <MatchResultTable matches={topMatches} />
  </div>
);

export default Dashboard;
