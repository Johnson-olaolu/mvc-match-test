import React from "react";
import "./style.scss";
import useDashboard from "../../context";
import CustomSelect from "../../../../components/custom-select";
import CustomDate from "../../../../components/custom-date";
import moment from "moment";
import CustomButton from "../../../../components/custom-button";

const DashboardHeader = () => {
  const { projectOptions, gatewayOptions, searchFormDetails, setSearchFormDetails, generateReport } = useDashboard();

  return (
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
        <CustomDate
          placeholder="From date"
          onChange={(d) => {
            setSearchFormDetails({
              ...searchFormDetails,
              from: moment(d).format("YYYY-MM-DD"),
            });
          }}
          value={moment(searchFormDetails.from).toDate()}
        />
        <CustomDate
          placeholder="To date"
          onChange={(d) => {
            setSearchFormDetails({
              ...searchFormDetails,
              to: moment(d).format("YYYY-MM-DD"),
            });
          }}
          minDate={moment(searchFormDetails.from).toDate()}
          value={moment(searchFormDetails.to).toDate()}
        />
        <CustomButton onClick={generateReport} title="Generate Report" />
      </div>
    </div>
  );
};

export default DashboardHeader;
