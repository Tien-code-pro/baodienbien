import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import { AxiosResponse } from "axios";
import { MetaData } from "@/types/metadata";
import { ArticleNews } from "@/types/articleNews";
import { barlow, mulish, poppins } from "@/components/hooks/font";
interface P {
  data: ArticleNews[] | null;
}
const BlockFeaturedNews = (props: P) => {
  const { data } = props;

  return (
    <div>
      <div className="flex flex-col lg:hidden">
        {data &&
          data.length > 0 &&
          data.slice(0, 1).map((e, i) => {
            return (
              <PageTypeMB1
                key={i}
                hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                tagg={true}
                sizeImage={{ width: 1920, height: 1080 }}
                classDiv={`flex flex-col`}
                classImage={`object-cover w-full h-[220px]`}
                linkImage={`${e.avatar_image}`}
                classTitle="text-xl text-[#343a40] mt-6 font-bold "
                title={e.article_title}
                classTag={`mt-4 text-[#D62127] text-xs`}
                tag={e.category_name}
                classDes={`mt-4 text-[#303030] text-[18px] `}
                des={e.article_title}
                altImage={e.article_title}
              />
            );
          })}
        <div className="flex flex-col mt-5">
          {data &&
            data.length > 0 &&
            data.slice(0, 5).map((e: any, i: any, arr: any) => {
              return (
                <PageTypeMB2
                  hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  sizeImage={{ width: 1920, height: 1080 }}
                  classDiv={`flex items-center [border-top:0.5px_solid_#D9D9D9] py-4`}
                  classImage={`object-cover w-[150px] h-[100px] mr-4 flex-shrink-0`}
                  linkImage={`${e.avatar_image}`}
                  classDes={`text-[#303030] `}
                  des={e.article_title}
                  altImage={e.article_title}
                />
              );
            })}
        </div>
      </div>
      <div className="hidden lg:flex justify-between mt-7 space-x-[30px]">
        <div className="flex flex-col w-3/12 xl:w-[270px] space-y-[30px]">
          {data &&
            data.length > 0 &&
            data.slice(1, 3).map((e: any, i: any, arr: any) => {
              return (
                <PageTypePC2
                  hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  sizeImage={{ width: 1920, height: 1080 }}
                  icon={false}
                  classDiv={`flex flex-col`}
                  classText={`mt-4 text-[#343a40] font-medium leading-[1.4] text-[18px]  ${poppins.className} `}
                  // classText={`mt-4 text-[#343a40] text-[16px] leading-[1.4] font-medium line-clamp-3`}
                  classImage={`object-cover w-full h-[180px]`}
                  linkImage={`${e.avatar_image}`}
                  desText={e.article_title}
                  altImage={e.article_title}
                  classIcon=""
                />
              );
            })}
        </div>
        {data &&
          data.length > 0 &&
          data.slice(0, 1).map((e: any, i: any, arr: any) => {
            return (
              <PageTypePC1
                key={i}
                hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                time={false}
                sizeImage={{ width: 1920, height: 1080 }}
                classDiv={`flex flex-col w-6/12 xl:w-[570px]`}
                classImage={`object-cover w-full h-[400px]`}
                linkImage={`${e.avatar_image}`}
                classTitle={`text-[30px] text-[#343a40] my-5 font-semibold  ${poppins.className}`}
                title={e.article_title}
                classTimeS={``}
                timeS={e.publish_date}
                classDes={`text-[14px] text-[#303030] leading-[1.5]`}
                des={e.article_sapo}
                altImage={e.article_title}
              />
            );
          })}

        <div className="flex flex-col w-3/12 xl:w-[270px] ">
          {data &&
            data.length > 0 &&
            data.slice(3, 7).map((e, i) => {
              return (
                <Link
                  href={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  className={`flex items-start [border-bottom:0.5px_solid_#E7E7E7] py-4 `}
                >
                  <div className="flex flex-1 flex-col">
                    <div
                      className={`text-[#343A40] text-[16px] font-medium leading-[1.4]  ${poppins.className} hover:text-[#D62127]`}
                      // className={`text-[#303030] line-clamp-4 hover:text-[#D62127]`}
                    >
                      {e.article_title}
                    </div>
                    <div className="text-[12px] leading-[1.5] text-[#b40c0e] uppercase mt-[6px]">
                      {e.category_name}
                    </div>
                  </div>
                  <Image
                    src={`${e.avatar_image}`}
                    width={1920}
                    height={1080}
                    className="object-cover w-[120px] h-[83px] ml-4"
                    alt="img2"
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default BlockFeaturedNews;
