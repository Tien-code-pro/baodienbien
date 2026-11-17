import axios from "axios";
import * as process from "process";

const instance = axios.create({
  baseURL: process.env.API_BACKEND,
});
export const AxiosSSRConfig = () => {
  return instance;
};
