"use server"

import { Article } from "@/types/articleNews";
// import ViewAudio from "./ViewAudio"
import { getDetailArticle } from "@/services/server-side/tin-tuc/tin-tuc.api";
import dynamic from "next/dynamic";

const ViewAudio = dynamic(() => import("./ViewAudio"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
let detailArticle: Article;

export default async function AudioPage({
  slug
}: {
  slug?: string
}) {

  if (slug) {
    const articleRes = await getDetailArticle(slug);
    if (articleRes.data.status > 0 && articleRes.data.data) {
      detailArticle = articleRes.data.data;
    }
  }
  return (
    <>
      {
        detailArticle &&
        <ViewAudio detailArticle={detailArticle} />
      }
    </>
  )
}