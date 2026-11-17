"use client";
import axios from "axios";
import { env } from "next-runtime-env";

const instance = axios.create({
  baseURL: `${env('NEXT_PUBLIC_API_BACKEND') || ""}`,
});
export const AxiosConfigSWR = () => {
  return instance;
};
