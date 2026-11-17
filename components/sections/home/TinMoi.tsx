import { mulish } from "@/components/hooks/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlockFeaturedNews from "@/components/blockHome/BlockFeaturedNews";
import { GetAdsTinMoiHandler, GetListTinNoiBatHandler } from "@/services/server-side/data-handler/tin-moi-ads.handler";
import Ads2Mobile from "./Ads2Mobile";

export default async function TinMoi() {
  const dataOutstandingNews = await GetListTinNoiBatHandler();
  const { resultAdsMobile, resultAdsWeb } = await GetAdsTinMoiHandler();

  return (
    <>
      <section
        className={`px-4 2xl:px-0 pt-0 lg:pt-8 pb-4 ${mulish.className}`}
      >
        <div className="container mx-auto  xl:max-w-[1200px]">
          {resultAdsWeb && (
            <Link href={resultAdsWeb.url} target="_blank">
              <Image
                src={resultAdsWeb.image_url}
                width={1920}
                height={1080}
                className="object-cover w-full mb-[20px] h-auto lg:h-[146px]  block"
                alt="Banner1"
              />
            </Link>
          )}

          <BlockFeaturedNews data={dataOutstandingNews} />

          {/* <Ads2Mobile /> */}
        </div>
      </section>
    </>
  );
}
