import https from "../utils/https";
import { IResponse } from "../utils/types";
import { IGateway, IProject, IReport } from "./types";

export const getAllProjects: () => Promise<IResponse<IProject[]>> = () => {
  return https
    .get({
      url: "/projects",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllGateways: () => Promise<IResponse<IGateway[]>> = () => {
  return https
    .get({
      url: "/gateways",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchReport: (body: { from: string; to: string; projectId?: string; gatewayId?: string }) => Promise<IResponse<IReport[]>> = (body) => {
  return https
    .post({
      url: "/report",
      body,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
