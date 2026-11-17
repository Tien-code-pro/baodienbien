"use server";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";

import SearchSection from "./SearchSection";
import { getArticleSearch } from "@/services/server-side/services-api/service-api";
// import SearchView from "./SearchView";
const SearchView = dynamic(() => import("./SearchView"), { ssr: false });
const TimKiem = async ({
  searchParams,
}: {
  searchParams: {
    search: string | undefined;
    page: string | undefined;
    type: string | undefined;
    time_type: "day" | "week" | "month" | "year" | undefined;
  };
}) => {
  return <SearchView />;
};
export default TimKiem;
