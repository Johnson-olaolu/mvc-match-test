import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Dashboard from "./pages/dashboard";
import "./app.css";
import { DashboardProvider } from "./pages/dashboard/context";

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
