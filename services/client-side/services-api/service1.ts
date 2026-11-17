"use client";
import { AxiosResponse } from "axios";
import { AxiosConfig } from "../axios.config";
import { Data, MetaData } from "@/types/metadata";
import {
  Article,
  ArticleMedia,
  ArticleNews,
  CategoryMenuResponse,
  child_menu,
  PaperType,
} from "@/types/articleNews";
import {
  AdvertisementType,
  ArticleChildCategory,
  CategoryMenu,
} from "@/types/category";
import { IProvince } from "@/types/apiTypes";

const api = AxiosConfig();
export const getDetailArticle = (
  slug: string | string[]
): Promise<AxiosResponse<Data<Article>>> => {
  return api.get("/web/article-get-by-slug", { params: { slug } });
};
export const getNewsByArticleType = (
  article_type: string,
  category_slug: string,
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return api.get("/web/article-get-news-by-article-type-and-category", {
    params: { article_type, category_slug, offset, limit },
  });
};
export const getPaperByType = (): Promise<
  AxiosResponse<MetaData<PaperType>>
> => {
  return api.get("/web/article-get-paper-type");
};
export const getArticlesByCategorySlugClient = (
  category_slug: string,
  limit?: number,
  start_date?: string
): Promise<AxiosResponse<MetaData<Article>>> => {
  return api.get("/web/article-get-news-by-category-slug", {
    params: start_date
      ? { category_slug, limit: limit || -1, start_date }
      : { category_slug, limit: limit || -1 },
  });
};
export const getArticlesByType = (
  article_type: string,
  limit: number
): Promise<AxiosResponse<MetaData<Article>>> => {
  return api.get("/web/article-get-news-by-article-type", {
    params: { article_type, limit },
  });
};
export const getCategoryDetail = (
  category_slug: string
): Promise<AxiosResponse<Data<CategoryMenuResponse>>> => {
  return api.get("/web/menu-get-single", {
    params: { menu_slug: category_slug },
  });
};
export const getMenuHeader = (): Promise<
  AxiosResponse<MetaData<CategoryMenu>>
> => {
  return api.get("/web/menu-get-list");
};
export const getMenuNavigateApi = (): Promise<
  AxiosResponse<MetaData<CategoryMenu>>
> => {
  return api.get("/web/menu-navigate-get-list");
};
export const getArticleMediaApi = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<AxiosResponse<MetaData<ArticleMedia>>> => {
  return api.get("/web/article-media-get-list", {
    params: {
      limit,
      offset,
    },
  });
};
// export const getArticleFocalNewsApi = (data: {
//   article_type: string;
//   limit: number;
// }): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
//     return api.get("/web/article-get-focal-news", {
//       params: data,
//     });
// };
export const getArticlesLocalApi = (): Promise<
  AxiosResponse<Data<child_menu>>
> => {
  return api.get("/web/menu-local-get-info", {
    params: "",
  });
};
export const getADSApi = (data: {
  device_type: string;
  page_type?: number;
  display_position?: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<AdvertisementType>>> => {
  return api.get("/web/ads-get-list", {
    params: data,
  });
};
export const getProvinceListApi = (): Promise<
  AxiosResponse<MetaData<IProvince>>
> => {
  return api.get("/web/get-province-list", {});
};
