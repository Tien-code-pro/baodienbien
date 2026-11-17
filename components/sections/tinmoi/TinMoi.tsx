"use client";
import useFont from "@/components/hooks/useFont";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import { getArticlesByType } from "@/services/client-side/services-api/service1";
import { Article } from "@/types/articleNews";
import momentTZ from "moment-timezone";
import React, { useEffect, useState } from "react";
import SkeletonTinMoi from "./SkeletonTinMoi";

const TinMoi = () => {
  const { mulish, poppins } = useFont();
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getArticlesByType("tin-bai", 6).then((res) => {
      setIsLoading(false);
      if (
        res.data &&
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list
      ) {
        setData(res.data.data.list);
      }
    });
  }, []);
  return (
    <>
      <section className={` ${mulish.className}`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex justify-between bg-[#f8f9fa] lg:bg-transparent py-4 lg:py-6 [border-bottom:1px_solid_rgba(0,_0,_0,_.1)] px-4 2xl:px-0">
            <div
              className={`text-[#343a40] lg:text-[#212529] ${poppins.className} text-2xl lg:text-[28px] font-semibold uppercase `}
            >
              Tin Mới
            </div>
          </div>
          <div className="flex flex-col px-4 2xl:px-0 ">
            {isLoading ? (
              <SkeletonTinMoi />
            ) : (
              <>
                {data.map((e, i, arr) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col py-4 lg:py-6 items-start [border-bottom:0.5px_solid_#E7E7E7] "
                    >
                      <PageTypePC1
                        hrefL={`/tin-bai/${e.category_slug}/${e.article_slug}`}
                        time={true}
                        sizeImage={{ width: 150, height: 100 }}
                        classDiv={`flex  `}
                        classImage={`object-cover flex-shrink-0 w-[150px] lg:w-[260px] h-[100px] lg:h-[173px] mr-4`}
                        linkImage={e.avatar_image}
                        classTitle={`text-[#343a40] line-clamp-4 font-medium lg:font-semibold lg:line-clamp-4 ${poppins.className} lg:text-[22px]`}
                        title={e.article_title}
                        classTimeS={`hidden lg:block text-[#6c757d] text-[13px] mt-4`}
                        timeS={momentTZ
                          .utc(e.publish_date)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("HH:mm DD/MM/YYYY")}
                        classDes={`text-[#303030] text-sm line-clamp-4 mt-4`}
                        des={e.article_sapo}
                        altImage={`img1`}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default TinMoi;
