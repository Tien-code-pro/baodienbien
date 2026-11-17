"use client";
import SpinLoading from "@/components/common/Loading/spin-loading";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import useFont from "@/components/hooks/useFont";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import { getPrintArticles } from "@/services/client-side/services-api/serviceAnhht-api";
import { Article } from "@/types/articleNews";

import React, { useEffect, useState } from "react";

const BaoIn = () => {
  const { mulish, barlow, poppins } = useFont();
  const [activeCategory, setActiveCategory] = useState<null | 1 | 4>(null);
  // const isMobile = useClientMediaQuery("(max-width:768px");
  // const [data, setData] = useState<Article[]>([]);
  const [infoNewsData, setInfoNewsData] = useState<{
    news: Article[];
    totalNews: number;
  }>({ news: [], totalNews: 0 });
  const [fetching, setFetching] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchInit = () => {
    getPrintArticles({ article_type: "bao-in", limit: 16, offset: 0 }).then(
      (res) => {
        if (
          res.data &&
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list
        ) {
          // setData(res.data.data.list);
          setInfoNewsData({
            news: res.data.data.list || [],
            totalNews: res.data.data.total,
          });
        }
      }
    );
  };

  const fetchDependOnCategory = (paper_type: number) => {
    getPrintArticles({
      article_type: "bao-in",
      limit: 16,
      offset: 0,
      paper_type,
    }).then((res) => {
      if (
        res.data &&
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list
      ) {
        // setData(res.data.data.list);
        setInfoNewsData({
          news: res.data.data.list || [],
          totalNews: res.data.data.total,
        });
      }
    });
  };
  useEffect(() => {
    if (activeCategory) {
      fetchDependOnCategory(activeCategory);
      return;
    } else {
      fetchInit();
    }
  }, [activeCategory]);
  const fetchMore = () => {
    setFetchingMore(true);
    setFetching(true);
    getPrintArticles({
      article_type: "bao-in",
      limit: 16,
      offset: currentPage + 1 * 16,
    }).then((res) => {
      if (res && res.data.status > 0) {
        // setData((prev) => [...prev, ...res.data.data.list]);
        setInfoNewsData((prev) => ({
          ...prev,
          news: [...prev.news, ...res.data.data.list],
        }));
        setCurrentPage((prev) => prev + 1);
      }
      setFetchingMore(false);
    });
  };
  return (
    <>
      <section
        className={`pt-5 lg:pt-8 pb-5 px-4 2xl:px-0 ${mulish.className}`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div
              onClick={() => {
                setActiveCategory(null);
              }}
              className={`text-[#212529] hover:text-[#D62127] duration-200 mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0 cursor-pointer`}
            >
              Báo in
            </div>

            <ul className="hidden lg:flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%]">
              <li
                onClick={() => {
                  setActiveCategory(1);
                  // Báo hằng ngày paper_type = 1
                }}
                className={`text-[13px] ${
                  poppins.className
                } text-[#6c757d] uppercase hover:text-[#D62127] duration-100 flex-shrink-0 cursor-pointer
                ${activeCategory === 1 ? "text-[#D62127] underline" : ""}
                `}
              >
                Báo in hằng ngày
              </li>

              <li
                onClick={() => {
                  setActiveCategory(4);
                  // Báo hằng ngày paper_type = 4
                }}
                className={`text-[13px] ${
                  poppins.className
                } text-[#6c757d] uppercase hover:text-[#D62127] duration-100 flex-shrink-0 cursor-pointer
                ${activeCategory === 4 ? "text-[#D62127] underline" : ""}
                `}
              >
                Báo in cuối tuần
              </li>
            </ul>
          </div>
          <hr className="[border-bottom:1px_solid_#CED1D8] my-5" />
          <div className="flex flex-wrap justify-start -mx-[15px]">
            {infoNewsData &&
              infoNewsData.news.length > 0 &&
              infoNewsData.news.map((e, i) => {
                return (
                  <PageTypeMB2
                    hrefL={`/bao-in/doc-bao/${e.article_slug}`}
                    key={i}
                    sizeImage={{ width: 335, height: 468 }}
                    classDiv={`flex flex-col items-center mb-9 mx-[15px] md:w-[calc(100%_/_2_-_30px)] lg:w-[calc(100%_/_3_-_30px)] xl:lg:w-[calc(100%_/_4_-_30px)]`}
                    classImage={`object-cover w-[270px] h-[400px]`}
                    linkImage={e.avatar_image}
                    classDes={`mt-5 text-[#303030] text-[18px] font-semibold ${poppins.className} text-center w-[270px]`}
                    des={e.article_sapo}
                    altImage={`img2`}
                  />
                );
              })}
          </div>
          {/* <button
            onClick={fetchMore}
            className="mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 "
          >
            Xem thêm
          </button> */}
          {fetchingMore ? (
            <div className="my-6 flex items-center justify-center">
              <SpinLoading color="#D62127" width={20} height={20} />
            </div>
          ) : (
            infoNewsData.totalNews > 16 * currentPage && (
              <button
                onClick={fetchMore}
                className=" mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 "
              >
                xem thêm
              </button>
            )
          )}
        </div>
      </section>
    </>
  );
};
export default BaoIn;
