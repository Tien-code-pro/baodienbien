"use client";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import useFont from "@/components/hooks/useFont";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import React, { useEffect, useState } from "react";
import { getOutstandingNews } from "@/services/server-side/tin-tuc/tin-tuc.api";
import { ArticleNews } from "@/types/articleNews";

export default function VideoNoiBat() {
  const isMobile = useClientMediaQuery("(max-width:768px");
  const { mulish } = useFont();
  const { barlow } = useFont();
  const { poppins } = useFont();
  const [dataVideo, setDataVideo] = useState<ArticleNews[]>([]);

  useEffect(() => {
    const data = {
      article_type: "video",
      limit: 10,
    };
    getOutstandingNews(data).then((res) => {
      if (res && res.data.status > 0) {
        setDataVideo(res.data.data.list);
      }
    });
  }, []);

  return (
    <>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} bg-[#E5E9F0] py-7 lg:pt-9 lg:pb-10`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex items-center justify-center md:space-x-9 ">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold text-center uppercase`}
            >
              Video nổi bật
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full hidden md:block" />
          </div>
          <div className=" flex-wrap -mx-3 lg:-mx-[15px] mt-9 hidden md:flex">
            {dataVideo &&
              dataVideo.length > 0 &&
              dataVideo
                .filter((e, i) => i <= 8)
                .map((e, i) => {
                  return (
                    <PageTypePC2
                      hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                      key={i}
                      sizeImage={{ width: 150, height: 180 }}
                      icon={true}
                      classIcon={`object-contain absolute top-0.5 left-0 hidden md:flex`}
                      classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] md:w-[calc(100%_/_3_-_30px)] lg:w-[calc(25%_-_30px)] mb-9`}
                      classText={`text-[#303030] mt-3 lg:mt-4 line-clamp-3 lg:text-[18px] relative md:indent-6 ${
                        !isMobile ? poppins.className : ""
                      }`}
                      classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                      linkImage={`${e.avatar_image}`}
                      desText={e.article_title}
                      altImage={e.article_title}
                    />
                  );
                })}
          </div>
          <div className="lg:hidden flex flex-col lg:flex-row justify-between mt-9 lg:mt-[35px] lg:space-x-8">
            {dataVideo &&
              dataVideo.length > 0 &&
              dataVideo
                .filter((e, i) => i < 1)
                .map((e, i) => {
                  return (
                    <PageTypePC1
                      hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                      time={true}
                      key={i}
                      sizeImage={{ width: 335, height: 220 }}
                      classDiv={`flex flex-col w-full flex-shrink-0`}
                      classImage={`object-cover w-full h-[220px]`}
                      classTitle="text-[18px] text-black font-bold line-clamp-2 mt-2"
                      title={`Phó Thủ tướng Chính phủ Trần Lưu Quang làm việc với tỉnh Điện Biên`}
                      classTimeS={``}
                      timeS={e.publish_date}
                      classDes={`text-[#303030] line-clamp-4 mt-4`}
                      linkImage={`${e.avatar_image}`}
                      des={e.article_title}
                      altImage={e.article_title}
                    />
                  );
                })}
            <div className="mt-8">
              <div className="flex flex-wrap -mx-3 ">
                {dataVideo &&
                  dataVideo.length > 0 &&
                  dataVideo
                    .filter((e, i) => i < 3 && i > 0)
                    .map((e, i) => {
                      return (
                        <PageTypePC2
                          hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                          key={i}
                          sizeImage={{ width: 150, height: 100 }}
                          icon={false}
                          classIcon={``}
                          classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)]`}
                          classText={`text-[#303030] mt-3 lg:mt-4 line-clamp-3`}
                          classImage={`object-cover w-full h-[100px]`}
                          linkImage={`${e.avatar_image}`}
                          desText={e.article_title}
                          altImage={e.article_title}
                        />
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
