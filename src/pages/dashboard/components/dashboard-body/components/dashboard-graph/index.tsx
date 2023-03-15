import React, { useEffect, useState } from "react";
import "./style.scss";
import { Cell, Pie, PieChart } from "recharts";
import useDashboard from "../../../../context";
import moment from "moment";
const DashboardGraph = () => {
  const { activeGateway, activeProject, report, projectOptions, gatewayOptions, showGraph } = useDashboard();
  const [data, setData] = useState<{ name: string; value: number }[]>();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    setTotal(parseFloat(report?.reduce((a, b) => b.amount + a, 0).toFixed(2) || "0"));
    if (activeGateway && !activeProject) {
      let projectsId = [...new Set(report?.map((r) => r.projectId))];
      let data = [];
      for (const id of projectsId) {
        let d = {
          name: projectOptions.find((o) => o.projectId == id)?.name || "",
          value: parseFloat(
            report
              ?.filter((r) => r.projectId == id)
              .reduce((a, b) => b.amount + a, 0)
              .toFixed(2) || "0"
          ),
        };
        data.push(d);
      }
      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (!activeGateway && activeProject) {
      let gatewayIds = [...new Set(report?.map((r) => r.gatewayId))];
      let data = [];
      for (const id of gatewayIds) {
        let d = {
          name: gatewayOptions.find((o) => o.gatewayId == id)?.name || "",
          value: parseFloat(
            report
              ?.filter((r) => r.gatewayId == id)
              .reduce((a, b) => b.amount + a, 0)
              .toFixed(2) || "0"
          ),
        };
        data.push(d);
      }
      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [activeGateway, activeProject, report]);
  const COLORS = ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" fontSize="16px" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="dashboard-graph">
      <div className="dashboard-graph-title">
        <ul className="dashboard-graph-legend">
          {data?.map((d) => (
            <li className="legend-item">
              <div className="legend-item-color"></div>
              <p className="legend-item-text">{d.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-graph-body">
        <div className="graph-container">
          <PieChart width={270} height={270}>
            <Pie
              data={data || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div className="dashboard-graph-footer">
        <p className="">PROJECT TOTAL | {total?.toLocaleString()} USD</p>
      </div>
    </div>
  );
};

export default DashboardGraph;
