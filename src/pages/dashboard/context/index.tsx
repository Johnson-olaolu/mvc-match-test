import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IGateway, IProject, IReport } from "../../../services/types";
import { fetchReport, getAllGateways, getAllProjects } from "../../../services/mockApi.service";

const DashboardContext = createContext({});

interface IDashboardContext {
  projectOptions: IProject[];
  gatewayOptions: IGateway[];
  searchFormDetails: {
    from: string;
    to: string;
    projectId?: string | undefined;
    gatewayId?: string | undefined;
  };
  setSearchFormDetails: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
      projectId?: string | undefined;
      gatewayId?: string | undefined;
    }>
  >;
  generateReport: () => Promise<void>;
  report?: IReport[];
}

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projectOptions, setProjectOptions] = useState<IProject[]>([]);
  const [gatewayOptions, setGatewayOptions] = useState<IGateway[]>([]);
  const [report, setReport] = useState<IReport[]>();

  const [searchFormDetails, setSearchFormDetails] = useState<{
    from: string;
    to: string;
    projectId?: string;
    gatewayId?: string;
  }>({
    from: "2021-01-01",
    to: "2021-12-31",
  });

  const fetchOptions = async () => {
    const p = await getAllProjects();
    setProjectOptions(p.data || []);
    const g = await getAllGateways();
    setGatewayOptions(g.data || []);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const generateReport = async () => {
    const result = await fetchReport(searchFormDetails);
    setReport(result.data);
  };

  const value = useMemo(
    () => ({
      projectOptions,
      gatewayOptions,
      searchFormDetails,
      setSearchFormDetails,
      generateReport,
      report,
    }),
    [projectOptions, gatewayOptions, searchFormDetails, report]
  );
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

const useDashboard = (): IDashboardContext => useContext(DashboardContext) as IDashboardContext;

export default useDashboard;
