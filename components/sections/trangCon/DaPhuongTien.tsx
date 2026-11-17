"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import { isMobile } from 'react-device-detect'
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import PageTypePC3 from "@/components/pageTypePC/PageTypePC3";
import React, { useEffect, useState } from "react";
import { Article } from "@/types/articleNews";
import { getMultiMediaCSR } from "@/services/client-side/services-api/service-api-tien";
// import moment from "moment";
import momentTZ from 'moment-timezone'
import { checkArticleMediaType } from "@/utils/helper";

const DaPhuongTien = ({
  type_slug
}: {
  type_slug?: string
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dataMediaNew, setDataMediaNew] = useState<Article[]>([]);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(0);
  const offset = (page - 1) * 8;
console.log("dataMediaNew", dataMediaNew);
useEffect(() => {
  getMultiMediaCSR(0, 8, type_slug).then((res) => {
    if (res && res.data.status > 0) {
      setDataMediaNew(res.data.data.list);
      setTotal(res.data.data.total);
    }
  });
}, []);

const renderTypeIcon = (articleTypeSlug?: string) => {
  if (!type_slug) {
    if (articleTypeSlug) {
      switch (articleTypeSlug) {
        case "video":
          return "/assets/images/home/icon5.png";
        case "e-magazine":
          return "/assets/images/home/icon10.png";
        case "audio":
          return "/assets/images/home/icon12.png";
        case "infographic":
          return "/assets/images/home/icon13.png";
        case "tin-bai":
          return "/assets/images/home/icon11.png";
      }
    } else {
      return "";
    }
  } else {
    switch (type_slug) {
      case "video":
        return "/assets/images/home/icon5.png";
      case "emagazine":
        return "/assets/images/home/icon10.png";
      case "audio":
        return "/assets/images/home/icon12.png";
      case "infographic":
        return "/assets/images/home/icon13.png";
      case "tin-bai":
        return "/assets/images/home/icon11.png";
    }
  }
};

  const handleLoadMore = () => {
    setIsLoading(true);
    const offsetCheck = page * 8;
    try {
      getMultiMediaCSR(offset, 8, type_slug).then((res) => {
        if (res && res.data.status > 0) {
          setTotal(res.data.data.total);
          setDataMediaNew((prev) => [...prev, ...res.data.data.list]);
          setPage((prevPage) => prevPage + 1);
        }
      });
    } catch (error) {
      console.error("Error loading more Media:", error);
    } finally {
      if (offsetCheck >= total) {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} pt-9 lg:pt-[50px] pb-[70px]`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 ">
            {dataMediaNew && dataMediaNew.length > 0 && (
              <PageTypePC3
                hrefL={`/${dataMediaNew[0].article_type_slug}/${dataMediaNew[0].category_slug}/${dataMediaNew[0].article_slug}`}
                time={true}
                sizeImage={{ width: 1920, height: 1080 }}
                classDiv={`flex flex-col lg:flex-row lg:items-start w-full flex-shrink-0 lg:space-x-8`}
                classImage={`object-cover w-full lg:w-[790px] h-[220px] lg:h-[400px]`}
                linkImage={`${dataMediaNew[0].avatar_image}`}
                classTitle={`text-xl lg:text-2xl text-[#434343] font-bold line-clamp-2 lg:line-clamp-3 mt-2 lg:mt-0 relative ${checkArticleMediaType({
                  article_type_slug: dataMediaNew[0].article_type_slug,
                  is_multi_media: dataMediaNew[0].is_multi_media
                }) ? "lg:indent-10" : ""} ${poppins.className} lg:text-[#505050]`}
                title={`${dataMediaNew[0].article_title}`}
                classTimeS={` text-[#D62127] text-[11px] lg:text-[18px] lg:text-[#909090] mt-3 lg:mt-5`}
                timeS={momentTZ.utc(dataMediaNew[0].publish_date).tz('Asia/Ho_Chi_Minh').format(
                  "HH:mm DD/MM/YYYY"
                )}
                classDes={`text-[#3C3C3C] lg:text-[#5A5A5A] line-clamp-[7] mt-3 lg:mt-5 lg:text-[18px]`}
                des={`${dataMediaNew[0].article_sapo}`}
                altImage={`img1`}
                icon={true}
                iconClass={`object-contain absolute top-0.5 left-0 hidden lg:flex lg:w-[30px] lg:h-[30px]`}
                iconImage={renderTypeIcon(dataMediaNew[0].article_type_slug)}
              />
            )}
            {/* Mobile */}
            <div className="mt-8 lg:hidden">
              <div className="flex flex-wrap -mx-3 ">
                {dataMediaNew && dataMediaNew.map((e, i) => {
                  return (
                    <PageTypePC2
                      hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                      key={i}
                      sizeImage={{ width: 1920, height: 1080 }}
                      icon={true}
                      classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                      classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                      classText={`text-[#303030] mt-3 line-clamp-3 text-base
                      relative ${!isMobile ? poppins.className : ""
                        }`}
                      classImage={`object-cover w-full h-[100px]`}
                      linkImage={`${e.avatar_image}`}
                      desText={`${e.article_title}`}
                      altImage={`img2`}
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile */}
          </div>
          <hr className="w-full [border-top:0.5px_solid_#D9D9D9] mt-6 lg:mt-11" />

          <div className="flex flex-wrap mx-auto lg:-mx-[15px] lg:mt-5 ">
            {dataMediaNew && dataMediaNew.map((e, i) => {
              return (
                <PageTypePC2
                  hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  sizeImage={{ width: 1920, height: 1080 }}
                  icon={true}
                  classIcon={`object-contain absolute top-0.5 lg:top-1.5 left-0 hidden lg:flex`}
                  classDiv={`flex items-center lg:flex-col w-full space-x-4 lg:space-y-8 lg:space-x-0 lg:w-[calc(100%_/_3_-_30px)] lg:mx-[15px] py-6 [border-bottom:0.5px_solid_#D9D9D9] lg:border-none`}
                  classText={`text-[#303030] lg:text-[#303030] lg:text-2xl lg:font-bold line-clamp-4  
                     ${e.article_type_slug || e.is_multi_media ? "leading-[1.4] relative md:indent-6 text-base" : ""
                    }  relative  ${isMobile ? "" : barlow.className
                    }`}
                  classImage={`object-cover lg:w-full w-[150px] h-[100px] lg:h-[250px]`}
                  linkImage={`${e.avatar_image}`}
                  desText={`${e.article_title}`}
                  altImage={`img2`}
                  srcIcon={e.article_type_slug}
                  isMultiMedia={e.is_multi_media}
                />
              );
            })}
          </div>
          {hasMore && (
            <button
              className={`mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Đang tải..." : "Xem thêm"}
            </button>
          )}
          {!hasMore && (
            <div className="text-center mt-5 text-gray-500">
              Đã hiển thị tất cả.
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default DaPhuongTien;
