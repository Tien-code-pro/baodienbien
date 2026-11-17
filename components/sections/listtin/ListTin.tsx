"use client";
import useFont from "@/components/hooks/useFont";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import momenttz from "moment-timezone";
import {
  getArticleMediaApi,
  getArticlesByCategorySlugClient,
  getCategoryDetail,
} from "@/services/client-side/services-api/service1";
import {
  Article,
  ArticleMedia,
  CategoryMenuResponse,
} from "@/types/articleNews";
import SpinLoading from "@/components/common/Loading/spin-loading";
import BlockMultimedia from "@/components/blockHome/BlockMultimedia";
import moment from "moment";
import SkeletonListTin from "./SkeletonListTIn";

export default function ListTin({ category_slug }: { category_slug: string }) {
  const { mulish, barlow, poppins } = useFont();
  const isMobile = useClientMediaQuery("(max-width:768px");
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState<CategoryMenuResponse>();
  const [resultArticleMedia, setResultArticleMedia] = useState<ArticleMedia[]>(
    []
  );
  useEffect(() => {
    if (pageSize > 20) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    getArticlesByCategorySlugClient(category_slug, pageSize, "2025-05-05").then(
      (res) => {
        if (
          res.data &&
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list
        ) {
          setData(res.data.data.list);
          setTotal(res.data.data.total || 0);
        }
        if (pageSize > 20) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    );
    // getArticlesByCategorySlugClient(category_slug, pageSize).then((res) => {
    //   if (
    //     res.data &&
    //     res.data.status > 0 &&
    //     res.data.data &&
    //     res.data.data.list
    //   ) {
    //     setData(res.data.data.list);
    //     setTotal(res.data.data.total || 0);
    //   }
    //   if (pageSize > 20) {
    //     setLoadingMore(false);
    //   } else {
    //     setLoading(false);
    //   }
    // });
  }, [pageSize]);
  useEffect(() => {
    getCategoryDetail(category_slug).then((res) => {
      if (res.data && res.data.status > 0 && res.data.data) {
        setCategory(res.data.data);
      }
    });
    getArticleMediaApi({
      limit: 5,
      offset: 0,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setResultArticleMedia(res.data.data.list);
      }
    });
  }, []);
  return (
    <>
      {/* pt-5 lg:pt-8 */}
      <section className={`  pb-5 px-4 2xl:px-0 ${mulish.className}`}>
        {isLoading ? (
          <div className="py-[35px]">
            <SkeletonListTin />
          </div>
        ) : (
          <>
            {data.length > 0 ? (
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
                    {data.length > 0 && (
                      <PageTypePC1
                        hrefL={`/${data[0].article_type_slug}/${data[0].category_slug}/${data[0].article_slug}`}
                        time={true}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 `}
                        classImage={`object-cover w-full h-[220px] lg:h-[400px] object-fill`}
                        linkImage={data[0].avatar_image}
                        classTitle="text-xl lg:text-[30px] leading-snug text-black lg:text-[#343a40] font-bold mt-2 lg:mt-5"
                        title={data[0].article_title}
                        classTimeS={`block lg:hidden text-[#D62127] text-[11px] mt-4`}
                        // timeS={data[0].publish_date + 123}
                        timeS={momenttz(momenttz.utc(data[0].publish_date))
                          .tz("Asia/Bangkok")
                          .format("HH:mm DD/MM/YYYY")}
                        classDes={`text-[#303030] lg:text-[#303030]  mt-4`}
                        des={data[0].article_sapo}
                        altImage={`img1`}
                      />
                    )}
                    <div className="mt-8 lg:mt-0 ">
                      <div className="flex flex-wrap -mx-3 ">
                        {data.slice(1, 5).map((e, i) => {
                          return (
                            <PageTypePC2
                              hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                              key={i}
                              sizeImage={{ width: 1920, height: 1080 }}
                              icon={true}
                              classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                              classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                              classText={`text-[#343a40] mt-3 lg:mt-4  text-base lg:text-[16px] relative font-medium lg:leading-[1.4] ${
                                e.article_type_slug !== "tin-bai" &&
                                "lg:indent-6"
                              } ${!isMobile ? poppins.className : ""}`}
                              srcIcon={e.article_type_slug}
                              classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                              linkImage={e.avatar_image}
                              desText={e.article_title}
                              altImage={`img2`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {data.length > 5 && (
                  <>
                    {/* <hr className="[border-top:1px_solid_#CED1D8]" /> */}
                    <div className="flex lg:space-x-4">
                      <div className="flex flex-col w-full ">
                        {/* {data.slice(5, isMobile ? 23 : 15).map((e, i, arr) => { */}
                        {data.slice(5, pageSize).map((e, i, arr) => (
                          <>
                            {i === 6 && (
                              <div className="">
                                <BlockMultimedia
                                  listArticleMedia={resultArticleMedia}
                                  className=""
                                />
                              </div>
                            )}
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
                          </>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {total && data && (
                  <>
                    {data.length < total ? (
                      <button
                        onClick={() => setPageSize(pageSize + 10)}
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
        )}
      </section>
    </>
  );
}
