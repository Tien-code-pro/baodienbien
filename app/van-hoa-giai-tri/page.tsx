"use server";
// import Banner from "@/components/sections/trangCon/Banner";
// import DaPhuongTien from "@/components/sections/trangCon/DaPhuongTien";
import dynamic from "next/dynamic";
import React from "react";

const DaPhuongTien = dynamic(
  () => import("@/components/sections/vanhoagiaitri/DaPhuongTien"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default async function Page() {
  return (
    <>
  
      <DaPhuongTien />
    </>
  );
}
