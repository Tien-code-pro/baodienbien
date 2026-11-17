"use client";
import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import { ArticleNews } from "@/types/articleNews";
import { AxiosConfig } from "../axios.config";
import { AccountInfoResponse, LoginResponse } from "@/types/apiTypes";
import { IArticleSave } from "@/types/profile";

const api = AxiosConfig();
export const logIn = (
  user_name: string,
  password: string
): Promise<AxiosResponse<Data<LoginResponse>>> => {
  return api.get("/account/account-get-token", {
    params: { user_name, password },
  });
};
export const logInFaceBook = (
  access_token: string
): Promise<AxiosResponse<Data<any>>> => {
  return api.get("/account/facebook-login", {
    params: { access_token },
  });
};
export const logInGoogle = (
  id_token: string
): Promise<AxiosResponse<Data<any>>> => {
  return api.get("/account/google-login", {
    params: { id_token },
  });
};

export const register = (
  full_name: string,
  email: string,
  password: string
): Promise<AxiosResponse<Data<any>>> => {
  return api.post("/account/register-account", {
    full_name,
    email,
    password,
  });
};
export const sendEmail = (
  email: number | string,
  type: number
): Promise<AxiosResponse<Data<any>>> => {
  return api.post("/account/send-mail-auth-account", {
    email,
    type,
  });
};
export const accountVertify = (
  email: any,
  exp: any
): Promise<AxiosResponse<Data<any>>> => {
  return api.get(`/account/account-vertify?email=${email}&exp=${exp}`);
};
export const getAccountInfo = (): Promise<
  AxiosResponse<Data<AccountInfoResponse>>
> => {
  return api.get(`/account/account-get-info`);
};
export const passwordVertify = (
  email: any,
  exp: any
): Promise<AxiosResponse<Data<any>>> => {
  return api.get(`/account/vertify-new-password?email=${email}&exp=${exp}`);
};
export const getNewPassword = (
  email: any,
  exp: number,
  password: any
): Promise<AxiosResponse<Data<any>>> => {
  return api.post("/account/account-new-password", { email, exp, password });
};
export const postInsertBookmark = (
  article_id: number
): Promise<AxiosResponse<Data<any>>> => {
  return api.post("/account/bookmark-insert", { article_id });
};
export const getListBookmark = (
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<IArticleSave>>> => {
  return api.get("/account/bookmark-get-list", {
    params: { offset, limit },
  });
};
export const getDeleteBookmark = (
  article_id: number
): Promise<AxiosResponse<Data<any>>> => {
  return api.get("/account/bookmark-delete", {
    params: { article_id },
  });
};
export const getListViewed = (
  offset: number,
  limit: number
): Promise<AxiosResponse<MetaData<IArticleSave>>> => {
  return api.get("/account/article-viewed-get-list", {
    params: { offset, limit },
  });
};
export const postSendFeedback = (data: {
  title: string;
  content: string;
  department_id: number;
}): Promise<AxiosResponse<Data<any>>> => {
  return api.post("/account/send-feedback", data);
};
