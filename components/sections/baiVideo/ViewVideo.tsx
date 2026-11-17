"use client";
import useFont from "@/components/hooks/useFont";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategoryDetail } from "@/services/client-side/services-api/service1";
import { Article, CategoryMenuResponse } from "@/types/articleNews";
import moment from "moment/moment";
import PageTypeVideoPC from "@/components/pageTypePC/PageTypeVideoPC";
import BinhLuan from "@/components/sections/tin-chi-tiet/BinhLuan";

export default function ViewVideo({
  detailArticle,
  slug,
}: {
  detailArticle: Article;
  slug: string;
}) {
  const { mulish } = useFont();
  const { barlow } = useFont();
  const { poppins } = useFont();
  const [category, setCategory] = useState<CategoryMenuResponse>();

  useEffect(() => {
    getCategoryDetail(
      (detailArticle && detailArticle?.category_slug) || ""
    ).then((res) => {
      if (res.data && res.data.status > 0 && res.data.data) {
        setCategory(res.data.data);
      }
    });
  }, [detailArticle]);

  console.log(detailArticle, "detailArticle");
  // console.log(category,'category')

  return (
    <>
      {detailArticle ? (
        <section className={`${mulish.className} pt-8`}>
          <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 2xl:px-0">
              <div
                className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
              >
                {detailArticle?.category_name}
              </div>

              {category && (
                <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%]">
                  {category.child_menu &&
                    category.child_menu.length > 0 &&
                    category.child_menu.map((e, i) => {
                      return (
                        <li
                          key={i}
                          className={`text-[#6c757d] text-[13px] flex-shrink-0 ${poppins.className}`}
                        >
                          <Link
                            className="flex-shrink-0"
                            href={`/${detailArticle?.category_slug}/${e.menu_slug}`}
                          >
                            {e.menu_name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            <hr className="[border-bottom:1px_solid_#CED1D8] my-5 hidden lg:block " />
            {detailArticle ? (
              <>
                {detailArticle.list_file_info &&
                  detailArticle.list_file_info.map((e, i) => {
                    return (
                      <PageTypeVideoPC
                        hrefL={``}
                        key={i}
                        time={true}
                        sizeImage={{ width: `1000px`, height: `640px` }}
                        classDiv={`flex flex-col w-full flex-shrink-0 px-4 2xl:px-0 mt-5 lg:mt-8`}
                        classImage={`object-cover w-full h-[220px] lg:h-[658px] `}
                        linkImage={`${e.file_url}`}
                        classTitle={`text-[#343a40] text-xl lg:text-[30px] lg:leading-snug font-bold line-clamp-2 `}
                        title={`${detailArticle?.article_title}`}
                        classTimeS={`mt-3 lg:mt-7 text-xs text-[#D62127] lg:text-[18px] lg:text-[#6c757d] line-clamp-5 lg:line-clamp-2`}
                        timeS={moment(detailArticle?.publish_date).format()}
                        // .format(
                        //   "DD-MM-YYYY h:mm A"
                        // )
                        pen_name={detailArticle?.pen_name}
                        classDes={`mt-3 lg:mt-7 text-[18px] text-[#303030] lg:text-[#303030] lg:text-2xl`}
                        des={`${detailArticle?.article_title}`}
                        altImage={`img1`}
                      />
                    );
                  })}
              </>
            ) : (
              <></>
            )}
            <div className="text-right text-black font-bold">
              {detailArticle.pen_name}
            </div>

            {/* Binh luan */}
            <BinhLuan
              slug={slug}
              isComment={detailArticle ? detailArticle.enable_comment : 0}
            />
          </div>
        </section>
      ) : (
        <h1 className="text-black text-center m-20 ">
          Không tìm thấy bài viết
        </h1>
      )}
    </>
  );
}
