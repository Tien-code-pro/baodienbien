"use server";
import { getMenuHeaderSSR } from "@/services/server-side/services-api/service-api";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
// import Header from "./page";
// const Header = dynamic(() => import('./page'), { ssr: false })
const Header = dynamic(() => import("./page"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default async function HeaderMenu() {
  return <Header />;
}
