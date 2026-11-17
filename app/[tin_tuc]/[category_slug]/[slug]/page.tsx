"use server";

import AudioPage from "@/components/sections/baiAudio/AudioPage";
import BaiThuong from "@/components/sections/baiThuong/BaiThuong";
import BaiThuong3 from "@/components/sections/baiThuong3/BaiThuong3";
import BaiVideo from "@/components/sections/baiVideo/BaiVideo";
import { getArticleDetail } from "@/services/server-side/services-api/service-api";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const startTime = Date.now();
  const res = await getArticleDetail({ slug: params.slug ?? "" });
  if (!res.data || res.data.status <= 0) {
    return {};
  }
  const endTime = Date.now();
  const duration = endTime - startTime;
  const detailArticle = res.data.data;
  if (!detailArticle) return {};
  return {
    title: detailArticle.article_title,
    description: detailArticle.article_sapo,
    keywords: detailArticle.tag_list,
    openGraph: {
      images: [detailArticle.avatar_image || ""],
    },
  };
}
export default async function page({
  params,
}: {
  params: {
    slug: string | undefined;
    tin_tuc: string | undefined;
  };
}) {
  const article_type = params.tin_tuc || "";

  return (
    <>
      {article_type === "tin-bai" && <BaiThuong slug={params.slug} />}
      {article_type === "e-magazine" && <BaiThuong3 slug={params.slug} />}
      {article_type === "video" && <BaiVideo slug={params.slug} />}
      {article_type === "audio" && <AudioPage slug={params.slug} />}
    </>
  );
}
