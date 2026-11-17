"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import { barlow, mulish, poppins } from "@/components/hooks/font";
// import moment from "moment";
import momentTZ from 'moment-timezone'
import { ArticleMedia } from "@/types/articleNews";
import { isMobile } from "react-device-detect";
import { checkArticleMediaType } from "@/utils/helper";

const BlockMultimedia = ({
  listArticleMedia,
  className,
}: {
  listArticleMedia: ArticleMedia[];
  className?: string;
}) => {
  return (
    <section
      className={`bg-[#E5E9F0] px-4 2xl:px-0 ${mulish.className} ${className}`}
    >
      <div className="container mx-auto xl:max-w-[1200px]">
        <div className="flex flex-col">
          <div className="py-5 lg:py-[35px] ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <Link
                href={"/da-phuong-tien"}
                className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
              >
                Đa phương tiện
              </Link>
              <hr className="hidden lg:block mx-8 w-[150px] xl:w-[350px] border-[#CED1D8] 2xl:w-full" />
              <div className="flex justify-start ctscroll overflow-auto mt-3 lg:mt-0 xl:w-[680px] 2xl:w-[1500px] ">
                <Link
                  href={`/da-phuong-tien`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon5.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2"
                    alt="icon5"
                  />
                  <Link
                    href={"/da-phuong-tien/video"}
                    className={`text-[13px]  text-[#6c757d] ${poppins.className}`}
                  >
                    Video
                  </Link>
                </Link>
                <Link
                  href={`/da-phuong-tien/emagazine`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon10.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2"
                    alt="icon11"
                  />
                  <div
                    className={`text-[13px]  text-[#6c757d] ${poppins.className}`}
                  >
                    Emagazine
                  </div>
                </Link>
                <Link
                  href={`/da-phuong-tien/tin-anh`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon11.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2"
                    alt="icon11"
                  />
                  <div
                    className={`text-[13px]  text-[#6c757d] ${poppins.className}`}
                  >
                    Ảnh
                  </div>
                </Link>

                <Link
                  href={`/da-phuong-tien/audio`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon12.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2"
                    alt="icon13"
                  />
                  <div
                    className={`text-[13px]  text-[#6c757d] ${poppins.className}`}
                  >
                    PodCast
                  </div>
                </Link>
                <Link
                  href={`/da-phuong-tien/infographic`}
                  className="flex items-center flex-shrink-0"
                >
                  <Image
                    src={`/assets/images/home/icon13.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2"
                    alt="icon13"
                  />
                  <div
                    className={`text-[13px]  text-[#6c757d] ${poppins.className}`}
                  >
                    Infographic
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">
              {listArticleMedia &&
                listArticleMedia.length > 0 &&
                listArticleMedia
                  .filter((m, x) => x < 1)
                  .map((e, i) => {
                    return (
                      <PageTypePC1
                        hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                        key={i}
                        icon={true}
                        time={true}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0`}
                        classImage={`object-fill w-full h-[220px] lg:h-[400px]`}
                        linkImage={`${e.avatar_image}`}
                        classTitle={`text-[18px] lg:text-[30px] text-black lg:text-[#343a40] font-bold mt-2 lg:mt-5
                          ${
                            checkArticleMediaType({
                              article_type_slug: e.article_type_slug,
                              is_multi_media: e.is_multi_media,
                            })
                              ? "leading-[1.4] relative md:indent-8 text-base"
                              : ""
                          } 
                          `}
                        title={e.article_title}
                        classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                        timeS={momentTZ
                          .utc(e.publish_date)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("HH:mm DD/MM/YYYY")}
                        classDes={`text-[#303030] lg:text-[#303030] mt-4 text-sm leading-[1.5]`}
                        des={e.article_sapo}
                        altImage={e.article_title}
                        srcIcon={e.article_type_slug}
                        classIcon={`object-contain absolute top-2 left-0 hidden lg:flex lg:w-[25px] lg:h-[25px]`}
                        isMultiMedia={e.is_multi_media}
                      />
                    );
                  })}
              <div className="mt-8 lg:mt-0">
                <div className="flex flex-wrap -mx-3 ">
                  {listArticleMedia &&
                    listArticleMedia.length > 0 &&
                    listArticleMedia
                      .filter((m, i) => i > 0 && i < 5)
                      .map((e, i: any, arr: any) => {
                        return (
                          <PageTypePC2
                            hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                            key={i}
                            sizeImage={{ width: 1920, height: 1080 }}
                            icon={true}
                            srcIcon={e.article_type_slug}
                            classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                            classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                            classText={`text-[#343a40] mt-3 lg:mt-4 text-base lg:text-[16px] font-medium leading-[1.4] relative  
                            ${e.article_type_slug || e.is_multi_media ?
                                "md:indent-6" : ""
                              } 
                             ${!isMobile ? poppins.className : ""}`}
                            classImage={`object-fill w-full h-[100px] lg:h-[180px]`}
                            linkImage={`${e.avatar_image}`}
                            desText={e.article_title}
                            altImage={e.article_title}
                            isMultiMedia={e.is_multi_media}
                          />
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlockMultimedia;
