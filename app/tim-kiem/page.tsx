"use server";
import SearchView from "@/components/sections/timkiem/SearchView";
import React from "react";
export default async function Page() {
  return (
    <>
      <SearchView />
    </>
  );
}
// {
//   searchParams,
// }: {
//   searchParams: {
//     search: string | undefined;
//     page: string | undefined;
//     type: string | undefined;
//     time_type: "day" | "week" | "month" | "year" | undefined;
//   };
// }
