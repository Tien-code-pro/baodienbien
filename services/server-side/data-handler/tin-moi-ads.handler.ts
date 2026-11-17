"use server";
import { getADS } from "@/services/server-side/services-api/service-api";
import { AdvertisementType } from "@/types/category";
import { unstable_cache } from "next/cache";
import { getOutstandingNews } from "../tin-tuc/tin-tuc.api";
import { ArticleNews } from "@/types/articleNews";

export type GetAdsTinMoiProps = {
  resultAdsWeb: AdvertisementType | null;
  resultAdsMobile: AdvertisementType | null;
};
export const GetListTinNoiBatHandler = unstable_cache(
  async () => {
    let resultOutstandingNews: ArticleNews[] = [];
    const dataOutstandingNews = await getOutstandingNews({
      article_type: "",
      limit: 10,
    });
    if (
      dataOutstandingNews &&
      dataOutstandingNews.data &&
      dataOutstandingNews.data.data &&
      dataOutstandingNews.data.status > 0 &&
      dataOutstandingNews.data.data.list &&
      dataOutstandingNews.data.data.list.length > 0
    ) {
      resultOutstandingNews = dataOutstandingNews.data.data.list;
    }
    return resultOutstandingNews;
  },
  ["tin-noi-bat-tin-moi"],
  {
    revalidate: 60, // Cache for 60 seconds
  }
);
export const GetAdsTinMoiHandler = unstable_cache(
  async (): Promise<GetAdsTinMoiProps> => {
    let resultAdsWeb: AdvertisementType | null = null;
    let resultAdsMobile: AdvertisementType | null = null;
    const adsWeb = await getADS({
      device_type: "Web",
      display_position: 1,
      page_type: 1, // Trang chủ
      limit: 10,
    });
    const adsMB = await getADS({
      device_type: "mobile",
      display_position: 1,
      page_type: 1, // Trang chủ
      limit: 10,
    });
    if (
      adsWeb &&
      adsWeb.data &&
      adsWeb.data.status > 0 &&
      adsWeb.data.data.list &&
      adsWeb.data.data.list.length > 0
    ) {
      resultAdsWeb = adsWeb.data.data.list[0];
    }
    if (
      adsMB &&
      adsMB.data &&
      adsMB.data.status > 0 &&
      adsMB.data.data.list &&
      adsMB.data.data.list.length > 0
    ) {
      resultAdsMobile = adsMB.data.data.list[0];
    }
    return {
      resultAdsMobile,
      resultAdsWeb,
    };
  },
  ["ads-tin-moi"],
  {
    revalidate: 60, // Cache for 60 seconds
  }
);
