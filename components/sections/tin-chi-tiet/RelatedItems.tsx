"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import CoTheQuanTam from "./CoTheQuanTam";
import { useEffect, useState } from "react";
import { getRalatedArticleClt } from "@/services/client-side/services-api/service-api-tu";
import { Article } from "@/types/articleNews";
const TinLienQuanBinhLuan = dynamic(
  () => import("@/components/sections/tin-chi-tiet/TinLienQuanBinhLuan"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const TinLienQuanBinhLuan2 = dynamic(
  () => import("@/components/sections/tin-chi-tiet/TinLienQuanBinhLuan2"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export interface IMucLienQuanProps {
  typeArticle: "tin-bai" | "e-magazine";
  slug: string;
  article: any;
}

export default function RelatedItems(props: IMucLienQuanProps) {
  const { slug, article, typeArticle } = props;
  const [related, setRelate] = useState<Article[]>([]);
  useEffect(() => {
    getRalatedArticleClt({
      article_slug: slug || "",
      type: 1,
      limit: 8,
      offset: -1,
    }).then((res) => {
      if (res.status === 200) setRelate(res.data.data.list);
    });
  }, []);
  return (
    <>
      {typeArticle === "e-magazine" ? (
        <TinLienQuanBinhLuan2
          slug={slug || ""}
          isComment={article.enable_comment}
          related={related}
          article={article}
        />
      ) : (
        <TinLienQuanBinhLuan
          slug={slug || ""}
          isComment={article.enable_comment}
          related={related}
          article={article}
        />
      )}

      {related && <CoTheQuanTam related={related} />}
    </>
  );
}
