"use client";
import { AxiosConfig } from "@/services/client-side/axios.config";
import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import moment from "moment";
import { RequestBackend } from "@/types/request";

import { IDepartment, IFeedback, PagingParam } from "@/types/paramTypes";
import { CityShort } from "@/types/apiTypes";
import { data } from "jquery";
import { Article } from "@/types/articleNews";
const api = AxiosConfig();

export const getListDepartment = (data: {
  _department_name: string;
  offset: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<IDepartment>>> => {
  return api.get("/web/department-get-list", {
    params: data,
  });
};
export const getListFeedback = (data: {
  offset: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<IFeedback>>> => {
  return api.get("/account/get-list-feedback", {
    params: data,
  });
};
export const getArticleDetailClt = (data: {
  slug: string;
}): Promise<AxiosResponse<MetaData<IFeedback>>> => {
  return api.get("/web/article-get-by-slug", {
    params: data,
  });
};
export const getRalatedArticleClt = (data: {
  article_slug: string;
  type?: number;
  offset?: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  return api.get("/web/article-get-relate-by-slug", {
    params: data,
  });
};