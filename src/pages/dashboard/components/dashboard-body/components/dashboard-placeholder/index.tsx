import React from "react";
import DashboardPlaceholderImage from "../../../../../../assets/icons/DashboardPlaceholder.svg";
import "./styles.scss";
const DashboardPlaceholder = () => {
  return (
    <div className="dashboard-placeholder">
      <div className="dashboard-placeholder-container">
        <h4 className="dashboard-placeholder-title">No reports</h4>
        <p className="dashboard-placeholder-text">
          Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports
          will be shown.
        </p>
        <img src={DashboardPlaceholderImage} alt="" />
      </div>
    </div>
  );
};

export default DashboardPlaceholder;
