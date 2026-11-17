"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import Image from "next/image";
import React, { Suspense } from "react";
import Link from "next/link";
import { getArticlesByCategorySlugClient } from "@/services/client-side/services-api/service1";
import { CategoryMenu } from "@/types/category";

export default function CategoryBlock5({
  list_category,
}: {
  list_category: CategoryMenu[];
}) {
  const renderMobileSection = async (category_slug: string, index: number) => {
    return getArticlesByCategorySlugClient(category_slug, 3).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        return (
          <div key={index}>
            {res.data.data.list
              .filter((x, y) => y < 1)
              .map((e, i) => (
                <PageTypeMB1
                  hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  tagg={false}
                  sizeImage={{ width: 1920, height: 1080 }}
                  classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 mt-5`}
                  classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                  linkImage={`${e.avatar_image}`}
                  classTitle={`text-[18px] lg:text-[30px] text-black lg:text-[#343a40] font-bold  mt-2 lg:mt-5 ${poppins.className}`}
                  title={e.article_title}
                  classTag={``}
                  tag={e.category_name}
                  classDes={``}
                  des={e.article_title}
                  altImage={e.article_title}
                />
              ))}
            <div className="flex flex-col w-full mt-6">
              {res.data.data.list.map((e, i, arr) => (
                <PageTypeMB2
                  hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                  key={i}
                  sizeImage={{ width: 1920, height: 1080 }}
                  classDiv={`flex items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                    i === arr.length - 1
                      ? ""
                      : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                  }`}
                  classImage={`object-cover w-[150px] h-[100px] mr-4 flex-shrink-0 lg:mr-[30px]`}
                  linkImage={`${e.avatar_image}`}
                  classDes={`text-[#303030] `}
                  des={e.article_title}
                  altImage={e.article_title}
                />
              ))}
            </div>
          </div>
        );
      }
    });
  };
  const renderPCSection = async (category_slug: string, index: number) => {
    return getArticlesByCategorySlugClient(category_slug, 3).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        const listArticle = res.data.data.list;
        return (
          <>
            <div className="flex flex-col mt-6 space-y-4" key={index}>
              {listArticle &&
                listArticle.length > 0 &&
                listArticle
                  .filter((e, i) => i < 1)
                  .map((e: any, i: any, arr: any) => {
                    return (
                      <Image
                        key={`article-pc-${i}`}
                        width={1920}
                        height={1080}
                        src={`${e.avatar_image}`}
                        alt={e.article_title}
                        className="object-cover w-full h-[180px] "
                      />
                    );
                  })}
              {listArticle && listArticle.length > 0 && (
                <>
                  <Link
                    // href={listGiaoDuc[0]?.article_slug}
                    href={`/${listArticle[0].article_type_slug}/${listArticle[0].category_slug}/${listArticle[0].article_slug}`}
                  >
                    <div
                      className={` text-[#343a40] ${poppins.className} text-[16px] hover:text-[#D62127] leading-[1.4] font-medium`}
                    >
                      {listArticle[0]?.article_title}
                    </div>
                  </Link>
                  <hr
                    className={` [border-top:0.5px_solid_#E7E7E7] ${poppins.className}`}
                  />
                  {listArticle.length > 1 && (
                    <Link
                      // href={listGiaoDuc[1]?.article_slug}
                      href={`/${listArticle[1].article_type_slug}/${listArticle[1].category_slug}/${listArticle[1].article_slug}`}
                    >
                      <div
                        className={` text-[#343a40] ${poppins.className} text-[16px] hover:text-[#D62127] leading-[1.4] font-medium`}
                      >
                        {listArticle[1]?.article_title}
                      </div>
                    </Link>
                  )}
                  <hr
                    className={` [border-top:0.5px_solid_#E7E7E7] ${poppins.className}`}
                  />
                  {listArticle.length > 2 && (
                    <Link
                      href={`/${listArticle[2].article_type_slug}/${listArticle[2].category_slug}/${listArticle[2].article_slug}`}
                    >
                      <div
                        className={` text-[#303030] ${poppins.className} text-[16px] hover:text-[#D62127] leading-[1.4] font-medium`}
                      >
                        {listArticle[2]?.article_title}
                      </div>
                    </Link>
                  )}
                </>
              )}
            </div>
          </>
        );
      }
    });
  };

  return (
    <>
      <section
        className={`pt-8 lg:pt-14 pb-5 px-4 2xl:px-0 ${mulish.className}`}
      >
        <div className="container mx-auto xl:max-w-[1200px]" key={`mobile`}>
          {list_category.length > 0 &&
            list_category.map((e, i) => (
              <div className="flex flex-col" key={`mobile-${i}`}>
                <div className="flex flex-col lg:hidden">
                  <div className="flex items-center justify-between space-x-5">
                    <div
                      className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                    >
                      <Link href={`/tin-tuc/${e.menu_slug}`}>
                        {e.menu_name}
                      </Link>
                    </div>
                    <hr className="w-full border-[#CED1D8]" />
                  </div>
                  <Suspense fallback={<p>Loading...</p>}>
                    {renderMobileSection(e.menu_slug, i)}
                  </Suspense>
                </div>
              </div>
            ))}

          <div
            className="hidden lg:flex flex-wrap -mx-3 space-y-16 -mt-16"
            key={`pc`}
          >
            {list_category.length > 0 &&
              list_category.map((e, i) => (
                <div
                  key={`pc-${i}`}
                  className={`flex flex-col w-[calc(25%_-_24px)] mx-3 ${"my-16"}`}
                >
                  <div className="flex items-center space-x-5">
                    <div
                      className={`flex-shrink-0 text-2xl text-[#212529] font-bold ${barlow.className} uppercase`}
                    >
                      <Link href={`/tin-tuc/${e.menu_slug}`}>
                        {e.menu_name}
                      </Link>
                    </div>
                    <hr className="[border:1px_solid_#E7E7E7] w-full" />
                  </div>
                  <Suspense fallback={<p>Loading...</p>}>
                    {renderPCSection(e.menu_slug, i)}
                  </Suspense>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
