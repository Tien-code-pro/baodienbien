"use client";
import dynamic from "next/dynamic";

const LienHe = dynamic(() => import("@/components/sections/lienHe/LienHe"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
import React from "react";

export default function Page() {
  return (
    <>
      <LienHe />
    </>
  );
}
