"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import { isMobileDevice } from "@/components/hooks/isMobileSSR";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import { Article } from "@/types/articleNews";
import { checkArticleMediaType } from "@/utils/helper";
import React from "react";

export default async function CoTheQuanTam({
  related,
}: {
  related?: Article[];
}) {
  const isMobile = isMobileDevice();
  return (
    <>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} bg-[#E5E9F0] pt-7 lg:pt-9 lg:pb-10`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex items-center space-x-9">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold flex-shrink-0 uppercase`}
            >
              Có thể bạn quan tâm
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full" />
          </div>
          <div className="flex flex-wrap -mx-3 lg:-mx-[15px] mt-9 ">
            {related &&
              related.length > 0 &&
              related.map((e, i) => {
                return (
                  <PageTypePC2
                    hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                    key={i}
                    sizeImage={{ width: 1920, height: 1080 }}
                    icon={true}
                    classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                    classDiv={`flex flex-col mx-3 lg:mx-[15px] w-[calc(50%_-_24px)] lg:w-[calc(25%_-_30px)] mb-9`}
                    classText={`text-[#303030] mt-3 lg:mt-4 lg:text-[18px]  ${checkArticleMediaType({
                      article_type_slug: e.article_type_slug,
                      is_multi_media: e.is_multi_media
                    }) ? "lg:indent-6 relative" : ""
                      } ${!isMobile ? poppins.className : ""
                      }`}
                    classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                    linkImage={`${e.avatar_image}`}
                    desText={`${e.article_title}`}
                    altImage={`${e.article_title}`}
                    srcIcon={e.article_type_slug}
                    isMultiMedia={e.is_multi_media}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
