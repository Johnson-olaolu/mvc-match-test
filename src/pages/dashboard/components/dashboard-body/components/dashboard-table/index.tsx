import React, { useEffect, useState } from "react";
import "./style.scss";
import useDashboard from "../../../../context";
import moment from "moment";
const DashboardTable = () => {
  const { activeGateway, activeProject, report, projectOptions, gatewayOptions, showGraph } = useDashboard();
  const [total, setTotal] = useState<number>();
  const [isOpen, setIsOpen] = useState<string>();
  const [multipleData, setMultipleData] = useState<
    {
      title?: string;
      total?: number;
      table_title: string[];
      table_data: any[];
    }[]
  >();

  useEffect(() => {
    setTotal(parseFloat(report?.reduce((a, b) => b.amount + a, 0).toFixed(2) || "0"));
    if (!activeGateway && !activeProject) {
      let projectsId = [...new Set(report?.map((r) => r.projectId))];
      let data = [];
      for (const id of projectsId) {
        let d = {
          title: projectOptions.find((o) => o.projectId == id)?.name || "",
          total: parseFloat(
            report
              ?.filter((r) => r.projectId == id)
              .reduce((a, b) => b.amount + a, 0)
              .toFixed(2) || "0"
          ),
          table_title: ["Date", "Gateway", "Transaction ID", "Amount"],
          table_data:
            report
              ?.filter((r) => r.projectId == id)
              .map((fr) => [
                moment(fr.created).format("DD/MM/YYYY"),
                gatewayOptions.find((o) => o.gatewayId == fr.gatewayId)?.name,
                fr.paymentId,
                `${fr.amount.toLocaleString()} USD`,
              ]) || [],
        };
        data.push(d);
      }
      setMultipleData(data);
    }

    if (activeGateway && !activeProject) {
      let projectsId = [...new Set(report?.map((r) => r.projectId))];
      let data = [];
      for (const id of projectsId) {
        let d = {
          title: projectOptions.find((o) => o.projectId == id)?.name || "",
          total: parseFloat(
            report
              ?.filter((r) => r.projectId == id)
              .reduce((a, b) => b.amount + a, 0)
              .toFixed(2) || "0"
          ),
          table_title: ["Date", "Transaction ID", "Amount"],
          table_data:
            report
              ?.filter((r) => r.projectId == id)
              .map((fr) => [moment(fr.created).format("DD/MM/YYYY"), fr.paymentId, `${fr.amount.toLocaleString()} USD`]) || [],
        };
        data.push(d);
      }
      setMultipleData(data);
    }
    if (!activeGateway && activeProject) {
      let gatewayIds = [...new Set(report?.map((r) => r.gatewayId))];
      let data = [];
      for (const id of gatewayIds) {
        let d = {
          title: gatewayOptions.find((o) => o.gatewayId == id)?.name || "",
          total: parseFloat(
            report
              ?.filter((r) => r.gatewayId == id)
              .reduce((a, b) => b.amount + a, 0)
              .toFixed(2) || "0"
          ),
          table_title: ["Date", "Transaction ID", "Amount"],
          table_data:
            report
              ?.filter((r) => r.gatewayId == id)
              .map((fr) => [moment(fr.created).format("DD/MM/YYYY"), fr.paymentId, `${fr.amount.toLocaleString()} USD`]) || [],
        };
        data.push(d);
      }
      setMultipleData(data);
    }
    if (activeGateway && activeProject) {
      let projectsId = [...new Set(report?.map((r) => r.projectId))];
      let data = [];
      for (const id of projectsId) {
        let d = {
          title: undefined,
          total: undefined,
          table_title: ["Date", "Transaction ID", "Amount"],
          table_data:
            report
              ?.filter((r) => r.projectId == id)
              .map((fr) => [moment(fr.created).format("DD/MM/YYYY"), fr.paymentId, `${fr.amount.toLocaleString()} USD`]) || [],
        };
        data.push(d);
      }
      setMultipleData(data);
    }
  }, [activeGateway, activeProject, report]);

  return (
    <div className="dashboard-table">
      <div className="dashboard-table-container">
        <p className="dashboard-table-selector-text">
          {activeProject || "All projects"} | {activeGateway || "All gateways"}
        </p>

        {multipleData
          ?.sort((a, b) => a.title!.localeCompare(b.title || ""))
          .map((d) => (
            <div className="dashboard-table-table">
              {d.title && (
                <div onClick={() => setIsOpen(isOpen === d.title ? undefined : d.title)} className="table-title">
                  <p className="">{d.title}</p>
                  <p className="">TOTAL: {d.total?.toLocaleString()} USD</p>
                </div>
              )}
              {d.title === isOpen && (
                <div className="table-body">
                  <div className="table-body-title-row">
                    {d.table_title.map((t) => (
                      <p className="table-body-title-row-element">{t}</p>
                    ))}
                  </div>
                  {d.table_data.map((tdr) => (
                    <div className="table-body-body-row">
                      {tdr.map((tdrd: any) => (
                        <p className="table-body-body-row-element">{tdrd}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      {!showGraph && (
        <div className="dashboard-table-total">
          <p className="">TOTAL: {total?.toLocaleString()} USD</p>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
