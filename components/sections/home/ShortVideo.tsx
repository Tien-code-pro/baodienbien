"use client";
import { mulish, poppins } from "@/components/hooks/font";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import { getShortVideo } from "@/services/client-side/services-api/serviceTung-api";
import { ShortVideoType } from "@/types/articleNews";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function ShortVideo() {
  const [listShortVideo, setListShortVideo] = useState<ShortVideoType[]>([]);

  useEffect(() => {
    getShortVideo({
      pageNum: 1,
      pageSize: 4,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setListShortVideo(res.data.data.list);
      }
    });
  }, []);
  return (
    <>
      <section className={`${mulish.className} mt-[60px] overflow-hidden`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col bg-bg1 lg:bg-bg2 bg-cover py-5 lg:py-10">
            <div className="flex items-center space-x-3 lg:px-3">
              <hr className="[border-top:1px_solid_#ECECEC] w-full" />
              <Link href={"/short-video"}>
                <div
                  className={`text-[30px] lg:text-5xl ${poppins.className} uppercase font-semibold flex-shrink-0 text-nowrap`}
                >
                  Short video
                </div>
              </Link>
              <hr className="[border-top:1px_solid_#ECECEC] w-full" />
            </div>
            <div className="flex flex-wrap px-4 -mx-[15px]">
              {listShortVideo.map((e, i) => {
                return (
                  <button
                    key={i}
                    className="flex mx-[15px] w-[calc(50%_-_30px)] lg:mx-[10px] lg:w-[calc(25%_-_20px)] mt-7"
                  >
                    <PageTypeMB1
                      hrefL={`/short-video/${e.slug}`}
                      tagg={false}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`w-full`}
                      classImage={`object-cover w-full h-[240px] lg:h-[430px]`}
                      linkImage={e.avatar_image || ""}
                      classTitle={`text-[#D62127] text-xs lg:text-sm ${poppins.className} mt-7 mb-2 uppercase`}
                      title={`Short video`}
                      classTag={``}
                      tag={``}
                      // lg:w-[234px]
                      classDes={`lg:text-[16px] ${poppins.className} leading-[1.4] font-medium  h-[16px] w-[184px] lg:h-fit lg:w-full  text-center`}
                      des={e.article_title}
                      altImage={`img1`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
