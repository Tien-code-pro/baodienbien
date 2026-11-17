"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import SpinLoading from "@/components/common/Loading/spin-loading";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import {
  getArticleSearchList,
  getArticleTypes,
} from "@/services/client-side/services-api/serviceAnhht-api";
import { Article, ArticleType } from "@/types/articleNews";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import momentTZ from "moment-timezone";
type Sort = "day" | "week" | "month" | "year" | undefined;
interface SortOption {
  name: string;
  value: Sort;
}
interface IFilter {
  type: string;
  sort: Sort;
}
const sortOptions: SortOption[] = [
  { name: "Ngày", value: "day" },
  { name: "Tuần", value: "week" },
  { name: "Tháng", value: "month" },
  { name: "Năm", value: "year" },
];
const SearchView = () => {
  const searchParams = useSearchParams();
  const initSearch = searchParams.get("search") || undefined;
  const type = searchParams.get("time_type") as string | undefined;
  const time_type = searchParams.get("time_type") as
    | "day"
    | "week"
    | "month"
    | "year"
    | undefined;
  const [articleTypes, setArticleTypes] = useState<ArticleType[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    type: "",
    sort: undefined,
  });
  const [infoNewsData, setInfoNewsData] = useState<{
    news: Article[];
    totalNews: number;
  }>({ news: [], totalNews: 0 });
  const [fetching, setFetching] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState<string>(initSearch || "");
  const debouncedSearchKeyword = useDebounce<string>(keyword, 400);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setKeyword(inputValue);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (debouncedSearchKeyword) {
      setFetching(true);
      const isAuthorSearch = filter.type === "tac-gia";
      const article_type_slug =
        filter.type === "tac-gia" ? "" : filter.type || "tin-bai";
      getArticleSearchList({
        // author: isAuthorSearch ? debouncedSearchKeyword : "",
        // article_title: isAuthorSearch ? "" : debouncedSearchKeyword,
        article_title: debouncedSearchKeyword,
        time_type: filter.sort || "",
        category_slug: "",
        article_type_slug: filter.type || "",
        limit: 10 * currentPage,
        offset: 0,
      }).then((res) => {
        if (res && res.data.status > 0) {
          setInfoNewsData({
            news: res.data.data.list || [],
            totalNews: res.data.data.total,
          });
        } else {
          setInfoNewsData({
            news: [],
            totalNews: 0,
          });
        }
        setFetching(false);
      });
    // }
  };
  const fetchMore = () => {
    // if (debouncedSearchKeyword) {
      setFetchingMore(true);
      setFetching(true);
      const isAuthorSearch = filter.type === "tac-gia";
      const article_type_slug =
        filter.type === "tac-gia" ? "" : filter.type || "tin-bai";
      getArticleSearchList({
        // author: isAuthorSearch ? debouncedSearchKeyword : "",
        // article_title: isAuthorSearch ? "" : debouncedSearchKeyword,
        article_title: debouncedSearchKeyword,
        time_type: time_type || "",
        category_slug: "",
        article_type_slug: type || "tin-bai",
        limit: 10,
        offset: currentPage + 1 * 10,
      }).then((res) => {
        if (res && res.data.status > 0) {
          setInfoNewsData((prev) => ({
            ...prev,
            news: [...prev.news, ...res.data.data.list],
          }));
          setCurrentPage((prev) => prev + 1);
        }
        setFetchingMore(false);
      });
    // }
  };
  useEffect(() => {
    getArticleTypes().then((res) => {
      if (res && res.status > 0) {
        setArticleTypes(res.data.data.list || []);
      }
    });
  }, []);
  useEffect(() => {
    if (initSearch) {
      setFetching(true);
      const isAuthorSearch = filter.type === "tac-gia";
      getArticleSearchList({
        // author:  isAuthorSearch ? debouncedSearchKeyword : "",
        // article_title: isAuthorSearch ? "" : debouncedSearchKeyword,
        article_title: debouncedSearchKeyword,
        time_type: time_type || "",
        category_slug: "",
        article_type_slug: type || "tin-bai",
        limit: 10 * currentPage,
        offset: 0,
      }).then((res) => {
        if (res && res.data.status > 0) {
          setInfoNewsData({
            news: res.data.data.list || [],
            totalNews: res.data.data.total,
          });
        }
        setFetching(false);
      });
    }
  }, [initSearch]);

  return (
    <section className={`${mulish.className} pt-8 pb-10 px-4 2xl:px-0`}>
      <div className="container mx-auto xl:max-w-[1200px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 bg-[#f8f9fa] lg:bg-white">
          <div
            className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
          >
            Tìm kiếm
          </div>
        </div>
        <hr className="[border-bottom:1px_solid_#CED1D8] my-5 hidden lg:block " />
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="mt-5 text-[#343a40] uppercase font-bold">
            Từ khóa:{" "}
            <strong className="font-semibold text-[#d72027] mx-0.5">
              {/* {searchParams.search} */}
            </strong>
          </div>
          <div className="mt-3 text-[#6c757d] text-sm">
            Có
            <strong className="font-semibold text-[#d72027] mx-0.5">
              {/* {res.data?.data?.total || 0}{" "} */}
            </strong>
            kết quả
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <div className="flex lg:p-5 lg:bg-[#f8f9fa] lg:mt-5 w-full">
            <div className="w-full flex items-center flex-wrap lg:justify-end lg:flex-nowrap lg:[border:1px_solid_rgba(0,_0,_0,_.1)] lg:h-[50px] space-y-[10px] lg:space-y-0 lg:space-x-2 lg:px-0.5 mt-4 rounded-[30px] bg-white">
              <input
                type="text"
                placeholder="Gõ từ khóa"
                onChange={handleChange}
                value={keyword}
                className="lg:mr-auto text-[#6c757d] placeholder:text-[#6c757d] [border:1px_solid_rgba(0,_0,_0,_.1)] px-5 rounded-[30px] h-12 lg:h-[30px] lg:border-none outline-none w-full"
              />
              <div className="flex items-center w-full lg:w-auto space-x-[10px]">
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setFilter((prev) => ({ ...prev, type: e.target.value }));
                  }}
                  className=" h-12 lg:h-[30px] [border:1px_solid_rgba(0,_0,_0,_.1)] rounded-[30px] text-[#6c757d] px-[10px] w-4/12 lg:w-[130px] flex-shrink-0 outline-none"
                >
                  <option value="" selected>
                    Tất cả
                  </option>
                  <option value="tac-gia">Tác giả</option>
                  {articleTypes &&
                    articleTypes.length > 0 &&
                    articleTypes.map((type, idx) => (
                      <option key={idx} value={type.article_type_slug}>
                        {type.article_type_name}
                      </option>
                    ))}
                </select>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    const selectedSort = e.target.value as Sort;
                    setFilter((prev) => ({ ...prev, sort: selectedSort }));
                  }}
                  className=" h-12 lg:h-[30px] [border:1px_solid_rgba(0,_0,_0,_.1)] rounded-[30px] text-[#6c757d] px-[10px] w-8/12 lg:w-[250px] flex-shrink-0 outline-none"
                >
                  <option value="" selected>
                    Sắp xếp theo ngày
                  </option>
                  {sortOptions.map((e, idx) => (
                    <option key={idx} value={e.value}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              {
                <button
                  type="submit"
                  className="h-11 w-full bg-[#b40c0e] rounded-[30px] font-semibold uppercase flex items-center justify-center lg:w-[140px] flex-shrink-0 "
                >
                  <Image
                    src={`/assets/images/timkiem/search.png`}
                    width={24}
                    height={36}
                    className="object-cover mr-2"
                    alt="search"
                  />
                  Tìm kiếm
                </button>
              }
            </div>
          </div>
        </form>

        <div className="flex flex-col mt-5 ">
          {!fetching && infoNewsData && infoNewsData.news.length === 0 && (
            <p className="text-center text-black">Không tìm thấy kết quả nào</p>
          )}
          {fetching && (
            <div className="my-6 mx-auto">
              <SpinLoading color="#D62127" width={20} height={20} />
            </div>
          )}
          {infoNewsData &&
            infoNewsData.news.length > 0 &&
            infoNewsData.news.map((e, i, arr) => {
              return (
                <div
                  key={i}
                  className="flex flex-col py-4 lg:py-6 items-start [border-top:0.5px_solid_#E7E7E7] "
                >
                  <PageTypePC1
                    hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                    time={true}
                    sizeImage={{ width: 150, height: 100 }}
                    classDiv={`flex  `}
                    classImage={`object-cover flex-shrink-0 w-[150px] lg:w-[260px] h-[100px] lg:h-[173px] mr-4`}
                    linkImage={e.avatar_image}
                    classTitle={`text-[#343a40] line-clamp-4 font-medium lg:font-semibold lg:line-clamp-4 ${poppins.className} lg:text-[22px] `}
                    title={e.article_title}
                    classTimeS={`hidden lg:block text-[#6c757d] text-[13px] mt-4 `}
                    timeS={momentTZ
                      .utc(e.publish_date)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("HH:mm DD/MM/YYYY")}
                    classDes={`text-[#303030] text-sm line-clamp-4 lg:mt-4 hidden lg:block`}
                    des={e.article_sapo}
                    altImage={`img1`}
                  />
                  <div className="uppercase text-[#d72027] text-xs ml-[166px] lg:hidden">
                    Chính trị
                  </div>
                </div>
              );
            })}
        </div>

        {fetchingMore ? (
          <div className="my-6 flex items-center justify-center">
            <SpinLoading color="#D62127" width={20} height={20} />
          </div>
        ) : (
          infoNewsData.totalNews > 10 * currentPage && (
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
  );
};

export default SearchView;
