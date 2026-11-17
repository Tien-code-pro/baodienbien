import { AxiosResponse } from "axios";
import { GetApiSSR } from "../api";
import { Data, MetaData } from "@/types/metadata";
import { CityShort, FaviconResponse, SitemapResponse } from "@/types/apiTypes";

export const getFaviconSSR = (): Promise<
  AxiosResponse<Data<FaviconResponse>>
> => {
  return GetApiSSR("/web/favicon-get");
};
export const getSitemapSSR = (): Promise<
  AxiosResponse<MetaData<SitemapResponse>>
> => {
  return GetApiSSR("/web/sitemap-get-list");
};
