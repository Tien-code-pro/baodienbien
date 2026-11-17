"use client";

import { getArticleDetailClt } from "@/services/client-side/services-api/service-api-tu";
// import TamDiem from "@/components/sections/tamDiem/tamdiem";
import dynamic from "next/dynamic";
import * as React from "react";
const TamDiem = dynamic(() => import("@/components/sections/tamDiem/tamdiem"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function Page() {
  React.useEffect(() => {
    getArticleDetailClt({ slug: "" });
  }, []);
  return (
    <>
      <TamDiem />
    </>
  );
}
