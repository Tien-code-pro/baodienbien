"use client";
import { AxiosResponse } from "axios";
import { AxiosConfig } from "../axios.config";
import { Data, MetaData } from "@/types/metadata";
import { ArticleChildCategory, CommentType } from "@/types/category";
import { objectToQueryString } from "@/utils/helper";
import { Article, ArticleNews, ShortVideoType } from "@/types/articleNews";

const api = AxiosConfig();
export const getHeaderCategory = (): Promise<
  AxiosResponse<MetaData<ArticleChildCategory>>
> => {
  return api.get("/web/menu-get-list");
};

export const handleBookmarkArticle = (data: {
  account_id?: number;
  article_slug: any;
  create_date?: string;
}): Promise<AxiosResponse<Data<any>>> => {
  return api.post(`/account/bookmark-insert?article_slug=${data.article_slug}`);
};
export const handleDeleteBookmarkArticle = (data: {
  article_slug: any;
}): Promise<AxiosResponse<Data<any>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/bookmark-delete?${query}`);
};

export const getCommentArticle = (data: {
  article_slug: string;
  type: 1 | 2;
  offset: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<CommentType>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/article-comment-get-by-article-slug?${query}`);
};

export const handleCommentArticle = (data: {
  article_slug: string;
  content_comment: string;
}): Promise<AxiosResponse<Data<any>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/article-comment-new-comment?${query}`);
};

export const handleReplyCommentArticle = (data: {
  article_slug: string;
  comment_id: string;
  content_comment: string;
}): Promise<AxiosResponse<Data<any>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/article-comment-reply-comment?${query}`);
};

export const handleLikeComment = (data: {
  article_slug: string;
  comment_id: string;
  parent_id: string;
  like: 1 | 2;
}): Promise<AxiosResponse<Data<any>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/article-comment-reply-comment?${query}`);
};

export const handleCheckBookMark = (data: {
  article_slug: string;
}): Promise<AxiosResponse<Data<number>>> => {
  const query = objectToQueryString(data);
  return api.get(`/account/bookmark-check?${query}`);
};

export const getRelatedArticleCSR = (data: {
  article_slug: string;
  type?: number;
  offset?: number;
  limit: number;
}): Promise<AxiosResponse<MetaData<Article>>> => {
  const query = objectToQueryString(data);
  return api.get(`/web/article-get-relate-by-slug?${query}`);
};

export const getListShortVideo = (data: {
  pageNum: number;
  pageSize: number;
}): Promise<AxiosResponse<MetaData<ShortVideoType>>> => {
  const query = objectToQueryString(data);
  return api.get(`/web/short-video-list?${query}`);
};
export const getShortVideo = (data: {
  pageNum: number;
  pageSize: number;
}): Promise<AxiosResponse<MetaData<ShortVideoType>>> => {
  const query = objectToQueryString(data);
  return api.get(`/web/short-video-list?${query}`);
};
export const getArticleFocalNewsApi = (data: {
  article_type: string;
  limit: number;
}): Promise<AxiosResponse<MetaData<ArticleNews>>> => {
  const query = objectToQueryString(data);
  return api.get(`/web/article-get-focal-news?${query}`);
};