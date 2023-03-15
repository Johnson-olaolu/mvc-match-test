import axios from "axios";
import QueryString from "query-string";
import { IDelete, IGet, IPatch, IPost, IPut } from "./types";

class HttpFacade {
  private http;

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL || "http://178.63.13.157:8090/mock-api/api",
      headers: { "Content-Type": "application/json" },
    });
  }

  post = async ({ url, body }: IPost) => {
    const response = await this.http.post(url, body);
    return response.data;
  };

  patch = async ({ url, body }: IPatch) => {
    const response = await this.http.patch(url, body);
    return response.data;
  };

  get = async ({ url, query = {} }: IGet) => {
    const queryString = `?${QueryString.stringify(query)}`;
    const response = await this.http.get(`${url + queryString}`);
    return response.data;
  };

  delete = async ({ url }: IDelete) => {
    const response = await this.http.delete(url);
    return response.data;
  };

  put = async ({ url, body }: IPut) => {
    const response = await this.http.put(url, body);
    return response.data;
  };
}

export default new HttpFacade();
