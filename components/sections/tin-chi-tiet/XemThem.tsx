"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { mulish, poppins } from "@/components/hooks/font";
import { getTopNews } from "@/services/client-side/tin-tuc/tin-tuc.api";
import { Article, ArticleNews } from "@/types/articleNews";
import Link from "next/link";
import { getADSApi } from "@/services/client-side/services-api/service1";
import { AdvertisementType } from "@/types/category";
export default function XemThem({
  article_info,
  article_slug,
}: {
  article_slug: string | undefined;
  article_info: Article;
}) {
  const [mostViewArticles, setMostViewArticles] = useState<ArticleNews[]>([]);
  const [adsData, setAdsData] = useState<AdvertisementType[]>([]);
  useEffect(() => {
    getTopNews({
      article_type: article_info.article_type_slug,
      category_slug: article_info.category_slug,
      limit: 5,
    }).then((res) => {
      if (res && res.data.status > 0) {
        setMostViewArticles(res.data.data.list);
      }
    });
    getADSApi({
      device_type: "web",
      limit: 10,
      display_position: 1,
      page_type: 8,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setAdsData(res.data.data.list || []);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {mostViewArticles &&
          mostViewArticles.length > 0 &&
          mostViewArticles[0] && (
            <Link
              href={`/${article_info.article_type_slug}/${article_info.category_slug}/${mostViewArticles[0].article_slug}`}
              className="flex relative"
            >
              <Image
                width={1920}
                height={1080}
                alt="1400logo2"
                src={mostViewArticles[0].avatar_image || ""}
              />
              <div
                className={`p-4 absolute bottom-0 left-0 right-0 ${poppins.className} flex items-center font-medium`}
              >
                <div className="text-[40px] text-[#9b9c9d] pr-2 w-[50px] flex-shrink-0">
                  1.
                </div>
                {mostViewArticles[0].article_title}
              </div>
            </Link>
          )}
        {mostViewArticles
          .filter((e, i) => i > 0)
          .map((article, idx) => (
            <Link
              href={`/${article_info.article_type_slug}/${article_info.category_slug}/${article.article_slug}`}
              key={article.article_id}
              className="[border-bottom:1px_solid_rgba(0,_0,_0,_.1)]"
            >
              <div
                className={`text-[#343a40]  ${poppins.className} flex items-center font-medium p-4`}
              >
                <div className="text-[40px] text-[#9b9c9d] pr-2 w-[45px] flex-shrink-0">
                  {idx + 2}.
                </div>
                {article.article_title}
              </div>
            </Link>
          ))}
      </div>
      <div className="w-[301px] flex flex-col gap-2 ">
        {adsData &&
          adsData.map((ad, id) => (
            <Link key={id} href={ad.url}>
              <Image
                src={ad.image_url}
                alt={ad.ad_name}
                width={301}
                height={625}
                className="object-cover w-[301px] h-full"
              />
            </Link>
          ))}
      </div>
    </>
  );
}
