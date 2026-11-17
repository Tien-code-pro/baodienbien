"use client";

// import TinMoi from "@/components/sections/tinmoi/TinMoi";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const TinMoi = dynamic(() => import("@/components/sections/tinmoi/TinMoi"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function Page() {
  // useEffect(() => {
  //   getArticleFocalNewsApi({
  //     article_type: "",
  //     limit: 20,
  //   }).then((res) => {});
  // }, []);
  return (
    <>
      <TinMoi />
    </>
  );
}
