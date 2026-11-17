import { AxiosResponse } from "axios";
import { GetApiSSR } from "../api";
import { Data, MetaData } from "@/types/metadata";
import { IProvince } from "@/types/apiTypes";
import { CategoryMenu } from "@/types/category";
import {
  Article,
  ArticleMedia,
  CategoryMenuResponse,
} from "@/types/articleNews";

export const getProvinceList = (): Promise<
  AxiosResponse<MetaData<IProvince>>
> => {
  return GetApiSSR("/web/get-province-list", {});
};
export const getMenuHeaderSSR = (): Promise<
  AxiosResponse<MetaData<CategoryMenu>>
> => {
  return GetApiSSR("/web/menu-get-list", {});
};
export const getArticlesByCategorySlugSSR = (
  category_slug: string,
  limit?: number,
  start_date?: string
): Promise<AxiosResponse<MetaData<Article>>> => {
  return GetApiSSR("/web/article-get-news-by-category-slug", {
    category_slug,
    limit: limit || -1,
  });
};
export const getCategoryDetailSSR = (
  category_slug: string
): Promise<AxiosResponse<Data<CategoryMenuResponse>>> => {
  return GetApiSSR("/web/menu-get-single", {
    menu_slug: category_slug,
  });
};
export const getArticleMediaApiSSR = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<AxiosResponse<MetaData<ArticleMedia>>> => {
  return GetApiSSR("/web/article-media-get-list", {
    limit,
    offset,
  });
};
// export const getArticleMediaApi = ({
//   limit,
//   offset,
// }: {
//   limit: number;
//   offset: number;
// }): Promise<AxiosResponse<MetaData<ArticleMedia>>> => {
//   return api.get("/web/article-media-get-list", {
//     params: {
//       limit,
//       offset,
//     },
//   });
// };
// export const getCategoryDetail = (
//   category_slug: string
// ): Promise<AxiosResponse<Data<CategoryMenuResponse>>> => {
//   return api.get("/web/menu-get-single", {
//     params: { menu_slug: category_slug },
//   });
// };
