import React, { useEffect, useState } from "react";
import "./style.scss";
import Layout from "../../components/layout";
import { DashboardProvider } from "./context";
import DashboardHeader from "./components/dashboard-header";
import DashboardBody from "./components/dashboard-body";

const Dashboard = () => {
  useEffect(() => {}, []);

  return (
    <DashboardProvider>
      <Layout>
        <div className="dashboard">
          <DashboardHeader />
          <DashboardBody />
        </div>
      </Layout>
    </DashboardProvider>
  );
};

export default Dashboard;
