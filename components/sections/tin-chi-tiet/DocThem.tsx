"use client";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import useFont from "@/components/hooks/useFont";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import { getRelatedArticleCSR } from "@/services/client-side/services-api/serviceTung-api";
import { Article } from "@/types/articleNews";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SpinLoading from "@/components/common/Loading/spin-loading";

interface P {
  isMobile: boolean;
  id: number;
  slug: string;
}
export default function DocThem(props: P) {
  const { isMobile, id, slug } = props;
  const { mulish } = useFont();
  const { barlow } = useFont();
  const pageNum = 1;
  const [more, setMore] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number>(isMobile ? 4 : 6);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    getRelatedArticleCSR({
      article_slug: slug,
      type: 2,
      limit: pageSize,
      offset: pageNum - 1,
    })
      .then((res) => {
        if (res && res.data && res.data.status > 0 && res.data.data) {
          setMore(res.data.data.list);
          setTotal(res.data.data.total - 8);
        }
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [pageSize]);

  return (
    <>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} pt-7 lg:pt-9 lg:pb-10`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex items-center space-x-9">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
            >
              Đọc thêm
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full" />
          </div>
          <div className="flex flex-col mb-4 space-x-4">
            <div className="flex flex-col">
              <div className="flex flex-col w-full">
                {more.map((e, i, arr) => {
                  return (
                    <PageTypePC1
                      hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                      key={i}
                      time={true}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`flex items-center w-full py-5 [border-bottom:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                        i === arr.length - 1
                          ? ""
                          : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                      }`}
                      classImage={`object-cover w-[150px] h-[100px] lg:w-[270px] lg:h-[180px] mr-4 lg:mr-[30px]`}
                      linkImage={e.avatar_image}
                      classTitle="text-[#343a40] lg:text-[#343a40] lg:text-[30px] lg:font-bold lg:leading-[37.65px]"
                      title={e.article_title}
                      classTimeS={`hidden lg:flex my-3 text-[#6c757d]`}
                      timeS={moment(e.publish_date).format("DD/MM/YYYY")}
                      classDes={`hidden lg:block my-3 text-[#303030] text-[17px]`}
                      des={e.article_sapo}
                      altImage={`img1`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-[301px] flex-shrink-0 hidden lg:flex"></div>
            {pageNum * pageSize < total ? (
              <button
                onClick={() => {
                  setLoadingMore(true);
                  setPageSize(pageSize + (isMobile ? 4 : 6));
                }}
              >
                <button className="mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 ">
                  {isLoadingMore ? (
                    <SpinLoading color="#fff" width={40} height={40} />
                  ) : (
                    "Xem thêm"
                  )}
                </button>
              </button>
            ) : (
              <p className="mx-auto font-bold text-2xl text-black text-center mt-10 ">
                Đã hiển thị hết
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
