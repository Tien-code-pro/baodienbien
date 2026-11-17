import dynamic from "next/dynamic";
import React from "react";
const BaoIn = dynamic(() => import("@/components/sections/baoIn/BaoIn"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function Page() {
  return (
    <>
      <BaoIn />
    </>
  );
}
