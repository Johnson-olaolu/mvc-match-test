import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IGateway, IProject, IReport } from "../../../services/types";
import { fetchReport, getAllGateways, getAllProjects } from "../../../services/mockApi.service";

const DashboardContext = createContext({});

interface IDashboardContext {
  projectOptions: IProject[];
  gatewayOptions: IGateway[];
  searchFormDetails?: {
    from: string;
    to: string;
    projectId?: string | undefined;
    gatewayId?: string | undefined;
  };
  setSearchFormDetails: React.Dispatch<
    React.SetStateAction<
      | {
          from?: string;
          to?: string;
          projectId?: string | undefined;
          gatewayId?: string | undefined;
        }
      | undefined
    >
  >;
  generateReport: () => Promise<void>;
  report?: IReport[];
  showGraph: boolean;
  activeGateway: string;
  activeProject: string;
}

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projectOptions, setProjectOptions] = useState<IProject[]>([]);
  const [gatewayOptions, setGatewayOptions] = useState<IGateway[]>([]);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<string>();
  const [activeGateway, setActiveGateway] = useState<string>();
  const [report, setReport] = useState<IReport[]>();

  const [searchFormDetails, setSearchFormDetails] = useState<{
    from?: string;
    to?: string;
    projectId?: string;
    gatewayId?: string;
  }>();

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
    const result = await fetchReport({
      ...searchFormDetails,
      from: searchFormDetails?.from || "2021-01-01",
      to: searchFormDetails?.to || "2021-12-31",
    });
    setReport(result.data);
    setActiveProject(projectOptions.find((p) => p.projectId == searchFormDetails?.projectId)?.name);
    setActiveGateway(gatewayOptions.find((g) => g.gatewayId == searchFormDetails?.gatewayId)?.name);
    if ((!searchFormDetails?.gatewayId && searchFormDetails?.projectId) || (searchFormDetails?.gatewayId && !searchFormDetails?.projectId)) {
      setShowGraph(true);
    } else {
      setShowGraph(false);
    }
  };

  const value = useMemo(
    () => ({
      projectOptions,
      gatewayOptions,
      searchFormDetails,
      setSearchFormDetails,
      generateReport,
      report,
      showGraph,
      activeGateway,
      activeProject,
    }),
    [projectOptions, gatewayOptions, searchFormDetails, report, showGraph]
  );
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

const useDashboard = (): IDashboardContext => useContext(DashboardContext) as IDashboardContext;

export default useDashboard;
