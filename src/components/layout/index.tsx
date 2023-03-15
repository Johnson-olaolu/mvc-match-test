import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import "./styles.scss";
import { DashboardProvider } from "../../pages/dashboard/context";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="">
      <Header />
      <section className="main-section">
        <Sidebar />
        <div className="content">{children}</div>
      </section>
      <footer>
        <p className="">Terms&Conditions </p>
        <hr />
        <p className="">Privacy policy</p>
      </footer>
    </main>
  );
};

export default Layout;
