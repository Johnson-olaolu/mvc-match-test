import React from "react";
import "./styles.scss";
import BarChartIcon from "../../../../../assets/icons/BarChart.svg";
import DashboardIcon from "../../../../../assets/icons/Dashboard.svg";
import TelevisonIcon from "../../../../../assets/icons/Television.svg";
import PieChartIcon from "../../../../../assets/icons/PieChart.svg";
import PowerIcon from "../../../../../assets/icons/Power.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        <ul className="">
          <li className="sidebar-menu-item">
            <img src={BarChartIcon} alt="" />
          </li>
          <li className="sidebar-menu-item">
            <img src={DashboardIcon} alt="" />
          </li>
          <li className="sidebar-menu-item">
            <img src={TelevisonIcon} alt="" />
          </li>
          <li className="sidebar-menu-item">
            <img src={PieChartIcon} alt="" />
          </li>
          <li className="sidebar-menu-item">
            <img src={PowerIcon} alt="" />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
