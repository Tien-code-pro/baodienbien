"use server";
import TinMoi from "@/components/sections/home/TinMoi";

import dynamic from "next/dynamic";

const TrangChuLazyView = dynamic(() => import("./TrangChuLazyView"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export async function generateMetadata() {
  return {
    title: "Báo Điện Biên Phủ",
    description:
      "Báo Điện Biên Phủ - Cơ quan của Đảng bộ Đảng Cộng sản Việt Nam tỉnh Điện Biên. Tiếng nói của Đảng bộ, chính quyền và Nhân dân các dân tộc tỉnh Điện Biên.",
    keyword: "Báo Điện Biên Phủ điện tử.",
  };
}
export default async function Home() {
  return (
    <main>
      <TinMoi />
      <TrangChuLazyView />
    </main>
  );
}
