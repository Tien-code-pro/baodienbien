"use server";
// import Banner from "@/components/sections/trangCon/Banner";
// import DaPhuongTien from "@/components/sections/trangCon/DaPhuongTien";
import dynamic from "next/dynamic";
import React from "react";
const Banner = dynamic(() => import("@/components/sections/trangCon/Banner"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const DaPhuongTien = dynamic(() => import("@/components/sections/trangCon/DaPhuongTien"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default async function Page() {
  return (
    <>
      <Banner />
      <DaPhuongTien />
    </>
  );
}
