// export const getTopNews = (
//   article_type: string,
//   category_slug: string,
//   limit: number
// ): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
//   return GetApiSSR("/web/article-get-most-view", {
//     article_type,
//     category_slug,
//     limit,
//   });

import { ArticleNews } from "@/types/articleNews";
import { MetaData } from "@/types/metadata";
import { AxiosResponse } from "axios";
import { AxiosConfig } from "../axios.config";

const api = AxiosConfig();
// };
export const getTopNews = (data: {
  article_type: string;
  category_slug: string;
  limit: number;
}): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  return api.get(`/web/article-get-most-view`, {
    params: { ...data },
  });
};
