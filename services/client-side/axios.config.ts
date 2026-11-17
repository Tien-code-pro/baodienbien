"use client";
import axios from "axios";
import { logInfo } from "@/utils/log-helper";
import { env } from 'next-runtime-env';

const instance = axios.create({
  baseURL: `${
    env("NEXT_PUBLIC_API_BACKEND") ||
    "https://api-dienbien.baodienbienphu.vn/api"
  }`,
});

export const setToken = (token: string) => {
  logInfo("setToken", {}, { token });
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  localStorage.setItem("vtc", token);
};
export const removeToken = () => {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = null;
    return config;
  });
  localStorage.clear();
};
export const getToken = async () => {
  return await localStorage.getItem("vtc");
};
export const AxiosConfig = () => {
  if (typeof window === "undefined") return instance;
  const token = localStorage.getItem("vtc");
  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return instance;
};
