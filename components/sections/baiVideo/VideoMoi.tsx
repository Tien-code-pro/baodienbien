"use client";
import useFont from "@/components/hooks/useFont";
import PageTypePC3 from "@/components/pageTypePC/PageTypePC3";
import React, { useEffect, useState } from "react";
import { getNewsByArticleType } from "@/services/server-side/tin-tuc/tin-tuc.api";
import moment from "moment/moment";
import { ArticleNews } from "@/types/articleNews";

export default function VideoMoi() {
  const { mulish, barlow, poppins } = useFont();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dataVideoNew, setDataVideoNew] = useState<ArticleNews[]>([]);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(0);
  const offset = (page - 1) * 8;

  useEffect(() => {
    getNewsByArticleType("video", "", 0, 8).then((res) => {
      if (res && res.data.status > 0) {
        setDataVideoNew(res.data.data.list);
        setTotal(res.data.data.total);
      }
    });
  }, []);

  // Dùng cho server side
  // const handleLoadMore = async () => {
  //   setIsLoading(true);
  //   const offsetCheck = page * 8;
  //   try {
  //     const resArticles = await getNewsByArticleType("video", "", offset, 8);
  //     const newVideos = resArticles.data.data.list;
  //
  //     if (resArticles && resArticles.data.status > 0) {
  //       setDataVideoNew((prev) => [...prev, ...newVideos]);
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error loading more videos:", error);
  //   } finally {
  //     if (offsetCheck >= total) {
  //       setHasMore(false);
  //     }
  //     setIsLoading(false);
  //   }
  // };

  // Dùng cho client side
  const handleLoadMore = () => {
    setIsLoading(true);
    const offsetCheck = page * 8;
    try {
      getNewsByArticleType("video", "", offset, 8).then((res) => {
        if (res && res.data.status > 0) {
          setTotal(res.data.data.total);
          setDataVideoNew((prev) => [...prev, ...res.data.data.list]);
          setPage((prevPage) => prevPage + 1);
        }
      });
    } catch (error) {
      console.error("Error loading more videos:", error);
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
        className={`px-4 2xl:px-0 ${mulish.className} py-7 lg:pt-9 lg:pb-10`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex items-center space-x-9">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
            >
              Video mới
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full lg:hidden" />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col w-full pt-6 ">
              {dataVideoNew &&
                dataVideoNew.length > 0 &&
                dataVideoNew.map((e, i, arr) => {
                  return (
                    <PageTypePC3
                      hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                      key={i}
                      time={true}
                      sizeImage={{ width: 150, height: 100 }}
                      classDiv={`flex items-center w-full py-5 lg:py-8 [border-top:0.5px_solid_#D9D9D9] `}
                      classImage={`object-cover w-[150px] h-[100px] lg:w-[270px] lg:h-[180px] mr-4 lg:mr-[30px] flex-shrink-0`}
                      linkImage={`${e.avatar_image}`}
                      classTitle={`lg:text-[30px] text-[#343a40] lg:text-[#343a40] lg:font-bold line-clamp-4 lg:line-clamp-2 relative lg:indent-8 lg: ${poppins.className}`}
                      title={`${e.article_title}`}
                      classTimeS={`hidden lg:flex my-3 text-[#6c757d] `}
                      timeS={moment(e.publish_date).format("DD-MM-YYYY h:mm A")}
                      classDes={`hidden my-3 text-[#303030] text-[17px] lg:line-clamp-2 `}
                      des={`${e.article_title}`}
                      altImage={`${e.article_title}`}
                      icon={true}
                      iconClass={`object-contain absolute top-0.5 lg:top-2 left-0 hidden lg:flex`}
                    />
                  );
                })}
            </div>
          </div>
          {hasMore && (
            <button
              className={`mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Đang tải..." : "Xem thêm"}
            </button>
          )}
          {!hasMore && (
            <div className="text-center mt-5 text-gray-500">
              Đã hiển thị tất cả video.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
