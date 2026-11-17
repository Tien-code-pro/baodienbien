import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import {
  AdvertisementType,
  ArticleChildCategory,
  CategoryMenu,
} from "@/types/category";
import {
  Article,
  CategoryMenuResponse,
  ShortVideoType,
} from "@/types/articleNews";
import { GetApiSSR } from "../api";

export const getMenuHeaderSSR = (): Promise<
  AxiosResponse<MetaData<ArticleChildCategory>>
> => {
  return GetApiSSR("/web/menu-get-list");
};

export const getArticleSearch = (data: {
  article_title: string;
  time_type: "day" | "week" | "month" | "year";
  category_slug: string;
  article_type_slug: string;
  offset: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-search-list", data);
};
// export const getArticleTypes = (): Promise<
//   AxiosResponse<MetaData<Article>>
// > => {
//   return GetApiSSR("/web/article-get-type");
// };
// here
export const getArticleDetail = (data: {
  slug: string;
}): Promise<AxiosResponse<Data<Article>>> => {
  return GetApiSSR("/web/article-get-by-slug", data);
};

export const getMultiMedia = (
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-media-get-list", {
    offset,
    limit,
  });
};

export const getADS = (data: {
  device_type: string;
  page_type?: number;
  display_position?: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<AdvertisementType>>> => {
  return GetApiSSR("/web/ads-get-list", data);
};

export const getRalatedArticle = (data: {
  article_slug: string;
  type?: number;
  offset?: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-relate-by-slug", data);
};

export const getCategoryNewsSlug = (data: {
  category_slug: string;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-news-by-category-slug", data);
};

export const getCategoryDetailSSR = (
  category_slug: string
): Promise<AxiosResponse<Data<CategoryMenuResponse>>> => {
  return GetApiSSR("/web/menu-get-single", { menu_slug: category_slug });
};

export const getDetailShortVideo = (
  slug: string
): Promise<AxiosResponse<Data<ShortVideoType>>> => {
  return GetApiSSR("/web/short-video-detail", { slug: slug });
};
export const getShortVideoSSR = (data: {
  pageNum: number;
  pageSize: number;
}): Promise<AxiosResponse<MetaData<ShortVideoType>>> => {
  return GetApiSSR("/web/short-video-list", data);
};
