import { AxiosSSRConfig } from "../axios.config";
import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import {
  Article,
  ArticleMedia,
  ArticleNews,
  child_menu,
  PaperType,
} from "@/types/articleNews";
import { GetApiSSR } from "../api";

export const getOutstandingNews = (data: {
  article_type: string;
  limit: number;
}): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return GetApiSSR("/web/article-get-outstanding-news", data);
};
export const getArticleMediaSSR = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<AxiosResponse<MetaData<ArticleMedia>>> => {
  return GetApiSSR("/web/article-media-get-list", {
    params: {
      limit,
      offset,
    },
  });
};
export const getArticleFocalNewsSSR = (data: {
  article_type: string;
  limit: number;
}): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return GetApiSSR("/web/article-get-focal-news", {
    params: data,
  });
};
export const getArticlesByMenu = (): Promise<
  AxiosResponse<Data<child_menu>>
> => {
  return GetApiSSR("/web/menu-local-get-info", {
    params: "",
  });
};
// here
export const getDetailArticle = (
  slug: string | string[]
): Promise<AxiosResponse<Data<Article>>> => {
  return GetApiSSR("/web/article-get-by-slug", {
    slug,
  });
};
export const getTopNews = (
  article_type: string,
  category_slug: string,
  limit: number
): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return GetApiSSR("/web/article-get-most-view", {
    article_type,
    category_slug,
    limit,
  });
};
export const getRelateArticle = (
  article_slug: string | string[] | undefined,
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-relate-by-slug", {
    article_slug,
    offset,
    limit,
  });
};

export const getNewsByArticleType = (
  article_type: string,
  category_slug: string,
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return GetApiSSR("/web/article-get-news-by-article-type-and-category", {
    article_type,
    category_slug,
    offset,
    limit,
  });
};

export const getNewsPaper = (): Promise<AxiosResponse<Data<Article>>> => {
  return GetApiSSR("/web/article-get-newest-paper");
};

export const getPaperByType = (): Promise<
  AxiosResponse<MetaData<PaperType>>
> => {
  return GetApiSSR("/web/article-get-paper-type");
};
export const getPaperByPageNumber = (
  paper_type_id: string
): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-by-paper-type-id", {
    paper_type_id,
  });
};

//bai tuong thuat
export const getDetailArticleLive = (
  slug: string | string[],
  sort_type: number
): Promise<AxiosResponse<Data<Article>>> => {
  return GetApiSSR("/web/article-live-get-by-slug", { slug, sort_type });
};
