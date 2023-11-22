import axios from "axios";
import { getJWT } from "../utils/auth";

export const restClient = axios.create({
  baseURL: "https://stg.dhunjam.in",
});

restClient.interceptors.response.use(
  function (response) {
   
    return response;
  },
  function (error) {
   
    return Promise.reject(error);
  }
);

restClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getJWT()}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
