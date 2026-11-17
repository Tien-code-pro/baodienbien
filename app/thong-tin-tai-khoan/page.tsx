import dynamic from "next/dynamic";

const ThongTinTaiKhoan = dynamic(
  () => import("@/components/sections/thongtintaikhoan/ThongTinTaiKhoan"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
import React from "react";

export default function Page() {
  return (
    <>
      <ThongTinTaiKhoan />
    </>
  );
}
