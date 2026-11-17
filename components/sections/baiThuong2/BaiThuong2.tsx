"use server";
import { isMobileDevice } from "@/components/hooks/isMobileSSR";
import CoTheQuanTam from "@/components/sections/tin-chi-tiet/CoTheQuanTam";
// import DocThem from "@/components/sections/tin-chi-tiet/DocThem";

import Tin from "@/components/sections/tin-chi-tiet/Tin";
// import TinLienQuanBinhLuan from "@/components/sections/tin-chi-tiet/TinLienQuanBinhLuan";
import {
  getArticleDetail,
  getRalatedArticle,
} from "@/services/server-side/services-api/service-api";
import dynamic from "next/dynamic";
import React from "react";
import Tin2 from "../tin-chi-tiet/Tin2";
const TinLienQuanBinhLuan2 = dynamic(
  () => import("@/components/sections/tin-chi-tiet/TinLienQuanBinhLuan2"),
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
export default async function BaiThuong2({ slug }: { slug?: string }) {
  const res = await getArticleDetail({ slug: slug || "" });

  const articleRelated = await getRalatedArticle({
    article_slug: slug || "",
    type: 1,
    limit: 8,
    offset: -1,
  });
  const related =
    (articleRelated &&
      articleRelated.data &&
      articleRelated.data.status > 0 &&
      articleRelated.data.data.list) ||
    [];
  const isMobile = isMobileDevice();
  if (res && res.data && res.data.status > 0 && res.data.data) {
    const article = res.data.data;
    return (
      <>
        <Tin2 slug={slug} article={article} />
        <TinLienQuanBinhLuan2
          slug={slug || ""}
          isComment={article.enable_comment}
          related={related}
          article={article}
        />

        {/* <TinTaiTro /> */}
        <CoTheQuanTam related={related} />
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
