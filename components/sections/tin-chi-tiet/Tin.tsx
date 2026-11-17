"use server";
import React from "react";
import { mulish, poppins } from "@/components/hooks/font";
import { getCategoryDetailSSR } from "@/services/server-side/services-api/service-api";
import { decode } from "html-entities";
import { Article } from "@/types/articleNews";
import momenttz from "moment-timezone";
import dynamic from "next/dynamic";
// import XemThem from "./XemThem";
import Link from "next/link";
const XemThem = dynamic(() => import("./XemThem"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Shares = dynamic(() => import("./Shares"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default async function Tin({
  slug,
  article,
}: {
  slug: string | undefined;
  article: Article;
}) {
  const categoryInfoRes = await getCategoryDetailSSR(article.category_slug);
  console.log("luclc: " + article.pen_name);
  return (
    <>
      <section
        className={`${mulish.className} pt-8 px-4 2xl:px-0`}
        id="detail-news"
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <Shares slug={slug || ""} />
          <div className="flex">
            <div className="flex w-full flex-col">
              {categoryInfoRes.data.status > 0 && categoryInfoRes.data.data && (
                <div
                  className={`${poppins.className} text-[#777777] mb-5 lg:mb-3`}
                >
                  {categoryInfoRes.data.data.parent_menu &&
                  categoryInfoRes.data.data.parent_menu.length > 0 ? (
                    <div className="flex flex-row gap-1">
                      <Link
                        href={`/tin-tuc/${categoryInfoRes.data.data.parent_menu[0].menu_slug}`}
                      >
                        {categoryInfoRes.data.data.parent_menu[0].menu_name}
                      </Link>
                      <p>/</p>
                      <Link
                        href={`/${categoryInfoRes.data.data.parent_menu[0].menu_slug}/${categoryInfoRes.data.data.menu_slug}`}
                      >
                        {categoryInfoRes.data.data.menu_name}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/tin-tuc/${categoryInfoRes.data.data.menu_slug}`}
                    >
                      {categoryInfoRes.data.data.menu_name}
                    </Link>
                  )}
                </div>
              )}
              <div
                className={`${poppins.className} text-[#343a40] font-bold lg:text-[18px] mb-1`}
              >
                {(article && article.sub_title) || ""}
              </div>
              <div
                className={`${poppins.className} text-[#343a40] font-bold text-[24px] lg:text-[30px] mb-3`}
              >
                {article && article.article_title}
              </div>
              <div className={`${poppins.className} text-[#C5C5C5] mb-5`}>
                {/* {article && article.author_name} |{" "} */}
                {article &&
                  momenttz(momenttz.utc(article.publish_date))
                    .tz("Asia/Bangkok")
                    .format("HH:mm DD/MM/YYYY")}
              </div>

              <hr className="[border-top:1px_solid_#CED1D8] mb-5" />
              <div
                className={`text-[#5A5A5A] mb-5 leading-6`}
                style={{
                  fontFamily:
                    "Mulish, Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "18px",
                  fontWeight: "700",
                  textAlign: "justify",
                  marginBottom: "20px",
                  color: "#343a40",
                }}
              >
                {article && article.article_sapo}
              </div>
              <div className="container mx-auto xl:max-w-[1200px] ">
                <section className="print-only  [&_p>iframe]:mx-auto">
                  {article && (
                    <>
                      <div
                        className={`${mulish.className} detail-news-icon text-black gap-[15px] flex flex-col editor-content`}
                        dangerouslySetInnerHTML={{
                          __html: decode(article.article_content),
                        }}
                      ></div>
                    </>
                  )}
                </section>
                <div className="text-right text-black font-bold">
                  {article.pen_name}
                </div>
              </div>
            </div>
            <div className=" pl-8 w-[300px] flex-shrink-0 hidden lg:block">
              <XemThem article_info={article} article_slug={slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
