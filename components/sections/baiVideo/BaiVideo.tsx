"use server";
import ViewVideo from "@/components/sections/baiVideo/ViewVideo";
import DocThem from "@/components/sections/baiVideo/VideoMoi";
import VideoNoiBat from "@/components/sections/baiVideo/VideoNoiBat";
import React from "react";
import { Article } from "@/types/articleNews";
import { getDetailArticle } from "@/services/server-side/tin-tuc/tin-tuc.api";

let detailArticle: Article;

export default async function BaiVideo({ slug }: { slug?: string }) {
  const params = { slug };
  if (params.slug) {
    const articleRes = await getDetailArticle(params.slug);
    if (articleRes.data.status > 0 && articleRes.data.data) {
      detailArticle = articleRes.data.data;
    }
  }
  return (
    <>
      {
        detailArticle && params.slug &&
        <ViewVideo detailArticle={detailArticle} slug={params.slug} />
      }

      <VideoNoiBat />
      <DocThem />
    </>
  );
}
