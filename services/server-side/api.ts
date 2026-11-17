import { logError, logInfo } from "@/utils/log-helper";
import axios, { AxiosResponse } from "axios";
import { objectToQueryString } from "@/utils/helper";
import { AxiosSSRConfig } from "./axios.config";

const api = AxiosSSRConfig();
export const GetApiSSR = async (url: string, data?: any) => {
  let domain = api.defaults.baseURL;
  let res = {} as AxiosResponse;
  const query = data ? objectToQueryString(data) : "";
  const full_path = url + "?" + query;
  try {
    res = await api.get(full_path);

    logInfo(
      "GetApiSSR",
      { domain, full_path, data },
      {
        HTTP_STATUS: res.status,
        STATUS_TEXT: res.statusText,
        code: res.data.code,
        mess: res.data.message,
      }
    );
  } catch (error) {
    logError("GetApiSSR", { domain, full_path, data }, { error });
  }
  return res;
};
export const PostApiSSR = async (url: string, data?: any) => {
  let domain = api.defaults.baseURL;
  let res = {} as AxiosResponse;
  try {
    res = await api.post(url, data);

    logInfo(
      "PostApiSSR",
      { domain, url, data },
      {
        HTTP_STATUS: res.status,
        STATUS_TEXT: res.statusText,
        code: res.data.code,
        mess: res.data.message,
      }
    );
  } catch (error) {
    logError("PostApiSSR", { domain, url, data }, { error });
  }
  return res;
};
