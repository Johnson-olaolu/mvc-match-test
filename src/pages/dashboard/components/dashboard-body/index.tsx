import React from "react";
import "./style.scss";
import useDashboard from "../../context";
import DashboardPlaceholder from "./components/dashboard-placeholder";
import DashboardTable from "./components/dashboard-table";
import DashboardGraph from "./components/dashboard-graph";

const DashboardBody = () => {
  const { report, showGraph } = useDashboard();
  return (
    <div className="dashboard-body">
      {report ? (
        <div className="dashboard-body-container">
          <DashboardTable />
          {showGraph && <DashboardGraph />}
        </div>
      ) : (
        <DashboardPlaceholder />
      )}
    </div>
  );
};

export default DashboardBody;
