"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import {
  getArticlesByCategorySlugClient,
  getCategoryDetail,
} from "@/services/client-side/services-api/service1";
import {
  getCategoryDetailSSR,
  getCategoryNewsSlug,
} from "@/services/server-side/services-api/service-api";
import { Article, CategoryMenuResponse } from "@/types/articleNews";
// import moment from "moment";
import momentTZ from 'moment-timezone'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { MoreOutlined } from "@ant-design/icons";
export default function CategoryBlock3({
  category_slug,
}: {
  category_slug: string;
}) {
  const [listArticle, setListArticle] = useState<Article[]>([]);
  const [category, setCategory] = useState<CategoryMenuResponse>();
  useEffect(() => {
    getArticlesByCategorySlugClient(category_slug, isMobile ? 3 : 5).then(
      (res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setListArticle(res.data.data.list);
        }
      }
    );
    getCategoryDetail(category_slug).then((res) => {
      if (res.data.status > 0 && res.data.data) {
        setCategory(res.data.data);
      }
    });
  }, []);
  return (
    <>
      {listArticle && listArticle.length > 0 ? (
        <div className="flex flex-col lg:flex-col-reverse">
          <section className={`bg-[#E5E9F0] px-4 2xl:px-0 ${mulish.className}`}>
            <div className="container mx-auto xl:max-w-[1200px]">
              <div className="flex-col hidden lg:flex">
                <div className=" py-5 lg:py-[35px] ">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div
                      className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                    >
                      {category && (
                        <Link href={`/tin-tuc/${category.menu_slug}`}>
                          {category.menu_name}
                        </Link>
                      )}
                    </div>
                    <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:flex-1 border-[#CED1D8] " />
                    {category && (
                      <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%]">
                        {category.child_menu &&
                          category.child_menu.length > 0 &&
                          category.child_menu
                            .filter((e, i) => i < 4)
                            .map((e, i) => {
                              return (
                                <li
                                  key={i}
                                  className={`text-[#888888] text-sm  ${mulish.className} flex-shrink-0`}
                                >
                                  <Link
                                    href={`${category.menu_slug}/${category.menu_slug}/${e.menu_slug}`}
                                  >
                                    {e.menu_name}
                                  </Link>
                                </li>
                              );
                            })}
                      </ul>
                    )}
                    {/* <button className="dropdown-button">
                      <MoreOutlined
                        style={{ fontSize: "20px", color: "black" }}
                      />
                      {category && (
                        <ul className="dropdown-list">
                          {category.child_menu &&
                            category.child_menu.length > 0 &&
                            category.child_menu
                              .filter((e, i) => i <= 4)
                              .map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`text-[13px]  text-[#6c757d] ${poppins.className} flex-shrink-0 text-left`}
                                  >
                                    <Link
                                      href={`/chinh-tri/${e.menu_slug}`}
                                      className="block px-[12px] py-[6px] hover:bg-gray-100"
                                    >
                                      {e.menu_name}
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      )}
                    </button> */}
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">
                    {listArticle.length > 0 && (
                      <PageTypePC1
                        hrefL={`/${listArticle[0].article_type_slug}/${listArticle[0].category_slug}/${listArticle[0].article_slug}`}
                        time={true}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0`}
                        classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                        linkImage={listArticle[0].avatar_image}
                        classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                        title={listArticle[0].article_title}
                        classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                        timeS={momentTZ.utc(listArticle[0].publish_date).tz('Asia/Ho_chi_minh').format(
                          "HH:mm DD/MM/YYYY"
                        )}
                        classDes={`text-[#303030] lg:text-[#303030]  mt-4 text-sm leading-[1.5] text-sm leading-[1.5]`}
                        des={listArticle[0].article_sapo}
                        altImage={`img1`}
                      />
                    )}
                    <div className="mt-8 lg:mt-0 ">
                      <div className="flex flex-wrap -mx-3 ">
                        {listArticle
                          .filter((e, i) => i !== 0)
                          .map((e, i) => {
                            return (
                              <PageTypePC2
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                                key={i}
                                sizeImage={{ width: 1920, height: 1080 }}
                                icon={true}
                                classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                                classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                                classText={`text-[#343a40] mt-3 lg:mt-4  text-base lg:text-[16px] relative font-medium lg:leading-[1.4] ${poppins.className}`}
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
              </div>
              <div className="flex flex-col lg:hidden">
                <div className="py-5 lg:py-[35px] ">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div
                      className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase`}
                    >
                      {category && (
                        <Link href={`/tin-tuc/${category.menu_slug}`}>
                          {category.menu_name}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">
                    {listArticle.length > 0 && (
                      <PageTypeMB1
                        hrefL={`/${listArticle[0].article_type_slug}/${listArticle[0].category_slug}/${listArticle[0].article_slug}`}
                        tagg={false}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex flex-col`}
                        classImage={`object-cover w-full h-[220px]`}
                        linkImage={listArticle[0].avatar_image}
                        classTitle={`text-xl text-[#343a40] mt-6 font-bold  ${poppins.className}`}
                        title={listArticle[0].article_title}
                        classTag={``}
                        tag={``}
                        classDes={`mt-4 text-[#303030] text-[18px] `}
                        des={listArticle[0].article_sapo}
                        altImage={`img1`}
                      />
                    )}
                    <div className="mt-8 lg:mt-0 ">
                      <div className="flex flex-wrap -mx-3 ">
                        {listArticle
                          .filter((e, i) => i !== 0)
                          .map((e, i) => {
                            return (
                              <PageTypePC2
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                                key={i}
                                sizeImage={{ width: 1920, height: 1080 }}
                                icon={true}
                                classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                                classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                                classText={`text-[#343a40] mt-3 lg:mt-4  text-base lg:text-[16px] relative font-medium lg:leading-[1.4] ${poppins.className}`}
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
              </div>
            </div>
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
