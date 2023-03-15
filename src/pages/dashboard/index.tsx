import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "./components/layout";
import CustomSelect from "../../components/custom-select";
import CustomDate from "../../components/custom-date";
import CustomButton from "../../components/custom-button";
import useDashboard from "./context";

const Dashboard = () => {
  const { projectOptions, gatewayOptions, searchFormDetails, setSearchFormDetails, generateReport } = useDashboard();
  useEffect(() => {}, []);

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className=" title-section">
            <h4>Reports </h4>
            <p className="">Easily generate a report of your transactions</p>
          </div>
          <div className="select-section">
            <CustomSelect
              placeholder="All Projects"
              options={projectOptions.map((po) => ({ name: po.name, value: po.projectId }))}
              value={searchFormDetails.projectId}
              handleClick={(e) => {
                setSearchFormDetails({
                  ...searchFormDetails,
                  projectId: e,
                });
              }}
            />
            <CustomSelect
              placeholder="All Gateways"
              options={gatewayOptions.map((go) => ({ name: go.name, value: go.gatewayId }))}
              value={searchFormDetails.gatewayId}
              handleClick={(e) => {
                setSearchFormDetails({
                  ...searchFormDetails,
                  gatewayId: e,
                });
              }}
            />
            <CustomDate placeholder="From date" />
            <CustomDate placeholder="To date" />
            <CustomButton onClick={generateReport} title="Generate Report" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
