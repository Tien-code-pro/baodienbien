"use client";
import { useEffect, useRef, useState } from "react";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import BlockMultimedia from "@/components/blockHome/BlockMultimedia";
import {
  Article,
  ArticleMedia,
  CategoryMenuResponse,
} from "@/types/articleNews";
import moment from "moment";
import Link from "next/link";
import useFont from "@/components/hooks/useFont";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import SpinLoading from "@/components/common/Loading/spin-loading";
import { getArticlesByCategorySlugClient } from "@/services/client-side/services-api/service1";

export default function ListTinDisplay({
  initialData,
  total: initTotal,
  category_slug,
  category,
  resultArticleMedia,
}: {
  initialData: Article[];
  total: number;
  category_slug: string;
  category: CategoryMenuResponse;
  resultArticleMedia: ArticleMedia[];
}) {
  const { barlow, poppins } = useFont();
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(initTotal);

  const [articles, setArticles] = useState<Article[]>(initialData);
  const [isLoadingMore, setLoadingMore] = useState(false);
  //
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  //
  const handleLoadMore = async (size: number) => {
    setLoadingMore(true);
    getArticlesByCategorySlugClient(category_slug, size).then((res) => {
      if (
        res.data &&
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list
      ) {
        setArticles(res.data.data.list);
      } else {
      }
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    const element = lastItemRef.current;
    console.log("element =>", articles.length, element);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          getArticlesByCategorySlugClient(category_slug, pageSize + 10).then(
            (res) => {}
          );
          // alert("Phần tử cuối đã vào viewport!");

          // Gọi prefetch hoặc bất kỳ hành động nào
          // fetchNextData();
        }
      },
      {
        root: null, // default là viewport
        rootMargin: "100px", // bắt sớm 100px trước khi thật sự vào viewport
        threshold: 0.1, // từ 10% trở lên tính là intersecting
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [articles, lastItemRef]);
  return (
    <div>
      <>
        {articles.length > 0 ? (
          <div className="">
            <div className="relative  py-5 lg:py-[35px] container mx-auto xl:max-w-[1200px] ">
              <div className="bg-[#fff] absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-[-1]" />
              <div className=" flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div
                  className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                >
                  {category && (
                    <div className="flex flex-row gap-2">
                      {category.parent_menu &&
                        category.parent_menu.length > 0 && (
                          <>
                            <Link
                              href={`/tin-tuc/${category.parent_menu[0].menu_slug}`}
                            >
                              {category.parent_menu[0].menu_name}
                            </Link>
                            <p>/</p>
                          </>
                        )}
                      <Link
                        href={`/${
                          category.parent_menu &&
                          category.parent_menu.length > 0
                            ? category.parent_menu[0].menu_slug
                            : "tin-tuc"
                        }/${category.menu_slug}`}
                      >
                        {category.menu_name}
                      </Link>
                    </div>
                  )}
                </div>

                {category && (
                  <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%]">
                    {category.child_menu &&
                      category.child_menu.length > 0 &&
                      category.child_menu.map((e, i) => {
                        return (
                          <li
                            key={i}
                            className={`text-[13px] ${poppins.className} text-[#6c757d] flex-shrink-0`}
                          >
                            <Link href={`/${category_slug}/${e.menu_slug}`}>
                              {e.menu_name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
              {/* <hr className="[border-top:1px_solid_#CED1D8] my-6" /> */}
              <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">
                {articles.length > 0 && (
                  <PageTypePC1
                    hrefL={`/${articles[0].article_type_slug}/${articles[0].category_slug}/${articles[0].article_slug}`}
                    time={true}
                    sizeImage={{ width: 1920, height: 1080 }}
                    classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 `}
                    classImage={`object-cover w-full h-[220px] lg:h-[400px] object-fill`}
                    linkImage={articles[0].avatar_image}
                    classTitle="text-xl lg:text-[30px] leading-snug text-black lg:text-[#343a40] font-bold mt-2 lg:mt-5"
                    title={articles[0].article_title}
                    classTimeS={`block lg:hidden text-[#D62127] text-[11px] mt-4`}
                    timeS={articles[0].publish_date}
                    classDes={`text-[#303030] lg:text-[#303030]  mt-4`}
                    des={articles[0].article_sapo}
                    altImage={`img1`}
                  />
                )}
                <div className="mt-8 lg:mt-0 ">
                  <div className="flex flex-wrap -mx-3 ">
                    {articles.slice(1, 5).map((e, i) => {
                      return (
                        <PageTypePC2
                          hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                          key={i}
                          sizeImage={{ width: 1920, height: 1080 }}
                          icon={true}
                          classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                          classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                          classText={`text-[#343a40] mt-3 lg:mt-4  text-base lg:text-[16px] relative font-medium lg:leading-[1.4] ${
                            !!(
                              e.article_type_slug !== "tin-bai" ||
                              (e.article_type_slug === "tin-bai" &&
                                e.is_multi_media > 0)
                            ) ? "lg:indent-6" :""
                          } `}
                          srcIcon={e.article_type_slug}
                          classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                          linkImage={e.avatar_image}
                          desText={e.article_title}
                          isMultiMedia={e.is_multi_media}
                          altImage={`img2`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {articles.length > 5 && (
              <>
                {/* <hr className="[border-top:1px_solid_#CED1D8]" /> */}
                <div className="flex lg:space-x-4">
                  <div className="flex flex-col w-full ">
                    {/* {articles.slice(5, isMobile ? 23 : 15).map((e, i, arr) => { */}
                    {articles.slice(5, pageSize).map((e, i, arr) => (
                      <>
                        {i === 6 && (
                          <div className="">
                            <BlockMultimedia
                              listArticleMedia={resultArticleMedia}
                              className=""
                            />
                          </div>
                        )}

                        <div
                          key={i}
                          ref={i === articles.length - 14 ? lastItemRef : null} //  gán ref vào phần tử thứ 3 từ cuối lên
                        >
                          <PageTypePC1
                            hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                            key={i}
                            time={true}
                            sizeImage={{ width: 1920, height: 1080 }}
                            // md:items-center
                            classDiv={`container mx-auto xl:max-w-[1200px] flex  w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                              i === arr.length - 1
                                ? ""
                                : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                            }`}
                            classImage={`object-cover w-[150px] h-[100px] lg:w-[270px] lg:h-[180px] mr-4 lg:mr-[30px]`}
                            linkImage={e.avatar_image}
                            classTitle="text-[#343a40]  lg:text-[#343a40] lg:text-[30px] lg:font-bold  leading-snug"
                            title={e.article_title}
                            classTimeS={`hidden lg:flex my-3 text-[#6c757d]`}
                            timeS={moment(e.publish_date).format(
                              "DD-MM-YYYY h:mm A"
                            )}
                            // text-[#d72027]
                            classDes={` mt-1 text-black/80 text-sm lg:text-[16px] hidden md:block line-clamp-4`}
                            des={e.article_sapo}
                            altImage={`img1`}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
            {total && articles && (
              <>
                {articles.length < total ? (
                  <button
                    // onClick={() => setPageSize(pageSize + 10)}
                    onClick={() => {
                      handleLoadMore(pageSize + 10);
                      setPageSize(pageSize + 10);
                    }}
                    disabled={isLoadingMore}
                    className="mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase "
                  >
                    {isLoadingMore ? (
                      <SpinLoading color="#fff" width={40} height={40} />
                    ) : (
                      "Xem thêm"
                    )}
                  </button>
                ) : (
                  <div className="text-center mt-5 text-gray-500">
                    Đã hiển thị tất cả.
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-black text-center mt-10">
            Chưa có bài viết thuộc chuyên mục.
          </div>
        )}
      </>
      {/* {articles.map((e, i) => (
        <PageTypePC1
          key={i}
          hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
          title={e.article_title}
          linkImage={e.avatar_image}
          timeS={moment(e.publish_date).format("DD-MM-YYYY h:mm A")}
          des={e.article_sapo}
          sizeImage={{ width: 1920, height: 1080 }}
          classDiv="py-3 border-b border-gray-300"
          classImage="w-full h-[180px] object-cover"
          classTitle="text-lg font-bold"
          classTimeS="text-sm text-red-600 mt-2"
          classDes="text-sm mt-1 text-gray-700"
          altImage="article"
          time
        />
      ))}

      {articles.length < total && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="mt-6 w-full max-w-xs bg-red-600 text-white py-3 font-bold uppercase mx-auto block"
        >
          {loading ? "Đang tải..." : "Xem thêm"}
        </button>
      )} */}
    </div>
  );
}
