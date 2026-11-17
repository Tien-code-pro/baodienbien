"use server";
import Image from "next/image";
import React from "react";
import { mulish, poppins } from "@/components/hooks/font";
import { getCategoryDetailSSR } from "@/services/server-side/services-api/service-api";
import { decode } from "html-entities";
import { Article } from "@/types/articleNews";
import dynamic from "next/dynamic";
import Link from "next/link";
import momenttz from "moment-timezone";
// import KeyPressHandler from "./PrintPressHandler";
// import Shares from "./Shares";

const KeyPressHandler = dynamic(() => import("./PrintPressHandler"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Shares = dynamic(() => import("./Shares"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Shares2 = dynamic(() => import("./Shares2"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default async function Tin2({
  slug,
  article,
}: {
  slug: string | undefined;
  article: Article;
}) {
  const categoryInfoRes = await getCategoryDetailSSR(article.category_slug);
  return (
    <>
      <section className={`${mulish.className} pt-8 px-4 2xl:px-0`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="hidden lg:block">
            <Shares slug={slug || ""} />
          </div>

          <div className="flex w-full flex-col">
            {categoryInfoRes.data.status > 0 && categoryInfoRes.data.data && (
              <div
                className={`${poppins.className} text-[#343a40] mb-3 text-center text-[13px] lg:text-xs`}
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
              className={`${poppins.className} text-[#343a40] font-bold text-[26px] lg:text-[32px] mb-3 text-center`}
            >
              {article && article.article_title}
            </div>
            <div
              className={`${poppins.className} text-[#6c757d] mb-5 text-center text-sm`}
            >
              {article && article.author_name} |{" "}
              {article &&
                momenttz(momenttz.utc(article.publish_date))
                  .tz("Asia/Bangkok")
                  .format("HH:mm DD/MM/YYYY")}
            </div>
            <div className="flex items-center justify-between bg-[#fff3cd] [border:1px_solid_#ffc107] rounded-[20px] h-[30px] px-4 w-[310px] mx-auto mb-5 group">
              <div className="text-sm text-[#6c757d] group-hover:text-[#d72027]">
                Theo dõi Báo Hà Tĩnh trên
              </div>
              <div className="mt-1">
                <Image
                  width={99}
                  height={18}
                  src={`/assets/images/vanhoagiaitri/gg-news.png`}
                  alt="gg-news"
                  className={`object-contain`}
                />
              </div>
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] mb-4" />
            <div className="flex justify-between items-center lg:hidden">
              <div className=""></div>
              <Shares2 slug={slug || ""} />
            </div>

            <hr className="[border-top:1px_solid_#CED1D8] my-4 lg:hidden" />

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
              <section className="print-only">
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
        </div>
      </section>
    </>
  );
}
