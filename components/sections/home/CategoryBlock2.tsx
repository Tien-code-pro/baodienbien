"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import { MoreOutlined } from "@ant-design/icons";
import {
  getADSApi,
  getArticlesByCategorySlugClient,
  getCategoryDetail,
} from "@/services/client-side/services-api/service1";
import { Article, CategoryMenuResponse } from "@/types/articleNews";
import { AdvertisementType } from "@/types/category";
// import moment from "moment";
import momentTZ from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function CategoryBlock2({
  category_slug,
}: {
  category_slug: string;
}) {
  const [listArticle, setListArticle] = useState<Article[]>([]);
  const [category, setCategory] = useState<CategoryMenuResponse>();
  // const [Ads7, setAds7] = useState<AdvertisementType[]>([]);
  const [Ads6, setAds6] = useState<AdvertisementType[]>([]);

  useEffect(() => {
    getArticlesByCategorySlugClient(category_slug, 3).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setListArticle(res.data.data.list);
      }
    });
    getCategoryDetail(category_slug).then((res) => {
      if (res.data.status > 0 && res.data.data) {
        setCategory(res.data.data);
      }
    });
    // getADSApi({
    //   device_type: "web",
    //   display_position: 7,
    //   page_type: 1,
    //   limit: 10,
    // }).then((res) => {
    //   if (
    //     res.data.status > 0 &&
    //     res.data.data &&
    //     res.data.data.list &&
    //     res.data.data.list.length > 0
    //   ) {

    //     setAds7(res.data.data.list || []);
    //   }
    // });
    getADSApi({
      device_type: "web",
      display_position: 6,
      page_type: 1, // Trang chủ
      limit: 10,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        // setAds6(res.data.data.list[0]);
        setAds6(res.data.data.list || []);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-col-reverse">
        <section className={`pt-8 pb-5 px-4 2xl:px-0 ${mulish.className}`}>
          <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex flex-col lg:hidden">
              <div className="flex items-center justify-between">
                <div
                  className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                >
                  {category && (
                    <Link href={`/tin-tuc/${category.menu_slug}`}>
                      {category.menu_name}
                    </Link>
                  )}
                </div>
                <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
              </div>
              {listArticle.length > 0 && (
                <PageTypeMB1
                  hrefL={`/${listArticle[0].article_slug}`}
                  tagg={false}
                  sizeImage={{ width: 1920, height: 1080 }}
                  classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 mt-5`}
                  classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                  linkImage={listArticle[0].avatar_image}
                  classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                  title={listArticle[0].article_title}
                  classTag={``}
                  tag={``}
                  classDes={``}
                  des={``}
                  altImage={`img1`}
                />
              )}

              <div className="flex flex-col w-full mt-6">
                {listArticle
                  .filter((e, i) => i !== 0)
                  .map((e, i, arr) => {
                    return (
                      <PageTypeMB2
                        hrefL={`/${e.article_slug}`}
                        key={i}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                          i === arr.length - 1
                            ? ""
                            : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                        }`}
                        classImage={`object-cover w-[150px] h-[100px] mr-4 flex-shrink-0 lg:mr-[30px]`}
                        linkImage={e.avatar_image}
                        classDes={`text-[#303030] `}
                        des={e.article_title}
                        altImage={`img2`}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="hidden lg:flex lg:space-x-8">
              <div className="flex flex-col w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-[16px]">
                  <div
                    className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                  >
                    {category && (
                      <Link href={`/tin-tuc/${category.menu_slug}`}>
                        {category.menu_name}
                      </Link>
                    )}
                  </div>
                  <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[350px] border-[#CED1D8] 2xl:w-full" />
                  {category && (
                    <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%] flex-shrink-0">
                      {category.child_menu &&
                        category.child_menu.length > 0 &&
                        category.child_menu
                          .filter((e, i) => i < 4)
                          .map((e, i) => {
                            return (
                              <li
                                key={i}
                                className={`text-[13px] ${poppins.className} text-[#6c757d] flex-shrink-0`}
                              >
                                <Link href={`/kinh-te/${e.menu_slug}`}>
                                  {e.menu_name}
                                </Link>
                              </li>
                            );
                          })}
                    </ul>
                  )}
                  <button className="dropdown-button">
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
                  </button>
                </div>
                <div className="flex mt-8 space-x-8">
                  <div className="flex flex-col w-[270px] flex-shrink-0 space-y-8">
                    {listArticle
                      .filter((e, i) => i !== 0)
                      .map((e, i) => {
                        return (
                          <PageTypePC2
                            hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                            // hrefL={`/${e.article_slug}`}
                            key={i}
                            sizeImage={{ width: 1920, height: 1080 }}
                            icon={false}
                            classDiv={`flex flex-col`}
                            classText={`mt-4 text-[#343a40] text-[16px] leading-[1.4] font-medium  ${poppins.className}`}
                            classImage={`object-cover w-full h-[180px]`}
                            linkImage={e.avatar_image}
                            desText={e.article_title}
                            altImage={`img2`}
                            classIcon=""
                          />
                        );
                      })}
                  </div>
                  {listArticle.length > 0 && (
                    <PageTypePC1
                      hrefL={`/${listArticle[0].article_type_slug}/${listArticle[0].category_slug}/${listArticle[0].article_slug}`}
                      time={true}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`flex flex-col w-full 2xl:w-[570px] 2xl:flex-shrink-0`}
                      classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                      linkImage={listArticle[0].avatar_image}
                      classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                      title={listArticle[0].article_title}
                      classTimeS={`hidden lg:block text-[#6c757d] text-[13px] leading-[1.5] mt-4`}
                      timeS={momentTZ
                        .utc(listArticle[0].publish_date)
                        .tz("Asia/Ho_chi_minh")
                        .format("HH:mm DD/MM/YYYY")}
                      classDes={`text-[#303030] text-sm leading-[1.5]  mt-4`}
                      des={listArticle[0].article_sapo}
                      altImage={`img1`}
                    />
                  )}
                </div>
              </div>
              <div className="hidden flex-col lg:flex w-[301px] gap-2 flex-shrink-0">
                {Ads6.length > 0 &&
                  Ads6.map((ad, id) => (
                    <Link key={id} target="_blank" href={ad.url}>
                      <Image
                        src={ad.image_url}
                        width={300}
                        height={228}
                        className="object-cover w-[301px] h-full mb-8 "
                        alt="img8"
                      />
                    </Link>
                  ))}
                {/* 
                {Ads7.length > 0 &&
                  Ads7.map((ad, id) => (
                    <Link key={id} target="_blank" href={ad.url}>
                      <Image
                        src={ad.image_url}
                        width={300}
                        height={300}
                        className="object-cover w-[301px] h-full"
                        alt="img9"
                      />
                    </Link>
                  ))} */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
