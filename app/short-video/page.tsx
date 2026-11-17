"use client";
import React from "react";

import dynamic from "next/dynamic";
const ShortVideo = dynamic(() => import("@/components/sections/shortVideos/ShortVideo"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function Page() {
  return (
    <>
      <ShortVideo />
    </>
  );
}
