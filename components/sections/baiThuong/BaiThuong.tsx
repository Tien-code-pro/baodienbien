"use server";
import { isMobileDevice } from "@/components/hooks/isMobileSSR";
// import DocThem from "@/components/sections/tin-chi-tiet/DocThem";

import Tin from "@/components/sections/tin-chi-tiet/Tin";
// import TinLienQuanBinhLuan from "@/components/sections/tin-chi-tiet/TinLienQuanBinhLuan";
import {
  getArticleDetail,
  getRalatedArticle,
} from "@/services/server-side/services-api/service-api";
import dynamic from "next/dynamic";
import React from "react";
const RelatedItems = dynamic(
  () => import("@/components/sections/tin-chi-tiet/RelatedItems"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const DocThem = dynamic(
  () => import("@/components/sections/tin-chi-tiet/DocThem"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
export default async function BaiThuong({ slug }: { slug?: string }) {
  const res = await getArticleDetail({ slug: slug || "" });
  const isMobile = isMobileDevice();
  if (res && res.data && res.data.status > 0 && res.data.data) {
    const article = res.data.data;
    return (
      <>
        <Tin slug={slug} article={article} />
        <RelatedItems
          typeArticle="tin-bai"
          slug={slug || ""}
          article={article}
        />

        {/* <TinTaiTro /> */}
        <DocThem
          isMobile={isMobile}
          id={article.article_id}
          slug={slug || ""}
        />
      </>
    );
  } else {
    return (
      <div className="m-48">
        <p className="text-black text-[20px] text-center">
          Không tìm thấy bài viết
        </p>
      </div>
    );
  }
}
