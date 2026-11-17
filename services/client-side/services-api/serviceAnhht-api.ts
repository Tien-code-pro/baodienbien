"use client";
import { AxiosResponse } from "axios";
import { AxiosConfig } from "../axios.config";
import { Data, MetaData } from "@/types/metadata";
import { IUserAccount, IWeatherData } from "@/types/apiTypes";
import { Article, ArticleType } from "@/types/articleNews";
import { objectToQueryString } from "@/utils/helper";

const api = AxiosConfig();

export const getWeather = (data: {
  lon: number;
  lat: number;
}): Promise<AxiosResponse<MetaData<IWeatherData>>> => {
  return api.get("/web/forecast-get-current-location", {
    params: { ...data },
  });
};

export const getAccountInfor = (params: {}): Promise<
  AxiosResponse<Data<IUserAccount>>
> => {
  return api.get("/account/account-get-info", {
    params,
  });
};

export const getArticleSearchList = (data: {
  // author: string;
  article_title: string;
  time_type: "day" | "week" | "month" | "year" | "";
  category_slug: string;
  article_type_slug: string;
  offset: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  const query = objectToQueryString(data);
  return api.get(`/web/article-get-search-list?${query}`);
};
export const getArticleTypes = (): Promise<
  AxiosResponse<MetaData<ArticleType>>
> => {
  return api.get("/web/article-get-type");
};

export const getPrintArticles = (data: {
  article_type: string;
  limit: number;
  offset: number;
  paper_type?: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  return api.get("/web/paper-get-news-by-article-type", {
    params: data,
  });
};
