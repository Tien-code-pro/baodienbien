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
export default function CategoryBlock4({
  category_slug1,
  category_slug2,
  category_slug3,
  category_slug4,
}: {
  category_slug1?: string;
  category_slug2?: string;
  category_slug3?: string;
  category_slug4?: string;
}) {
  const [listArticle1, setListArticle1] = useState<Article[]>([]);
  const [listArticle2, setListArticle2] = useState<Article[]>([]);
  const [listArticle3, setListArticle3] = useState<Article[]>([]);
  const [listArticle4, setListArticle4] = useState<Article[]>([]);
  const [category1, setCategory1] = useState<CategoryMenuResponse>();
  const [category2, setCategory2] = useState<CategoryMenuResponse>();
  const [category3, setCategory3] = useState<CategoryMenuResponse>();
  const [category4, setCategory4] = useState<CategoryMenuResponse>();
  const [adsBlock1, setAdsBlock1] = useState<AdvertisementType[]>([]);
  const [adsBlock2, setAdsBlock2] = useState<AdvertisementType[]>([]);
  const [adsBlock3, setAdsBlock3] = useState<AdvertisementType[]>([]);
  const [adsBlock4, setAdsBlock4] = useState<AdvertisementType[]>([]);
  useEffect(() => {
    if (category_slug1) {
      getArticlesByCategorySlugClient(category_slug1, 3).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setListArticle1(res.data.data.list);
        }
      });
      getCategoryDetail(category_slug1).then((res) => {
        if (res.data.status > 0 && res.data.data) {
          setCategory1(res.data.data);
        }
      });
      getADSApi({
        device_type: "web",
        limit: 10,
        display_position: 7,
        page_type: 1,
      }).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setAdsBlock1(res.data.data.list || []);
        }
      });
    }
    if (category_slug2) {
      getArticlesByCategorySlugClient(category_slug2, 3).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setListArticle2(res.data.data.list);
        }
      });
      getCategoryDetail(category_slug2).then((res) => {
        if (res.data.status > 0 && res.data.data) {
          setCategory2(res.data.data);
        }
      });
      getADSApi({
        device_type: "web",
        limit: 10,
        display_position: 10,
        page_type: 1,
      }).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setAdsBlock2(res.data.data.list || []);
        }
      });
    }
    if (category_slug3) {
      getArticlesByCategorySlugClient(category_slug3, 4).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setListArticle3(res.data.data.list);
        }
      });
      getCategoryDetail(category_slug3).then((res) => {
        if (res.data.status > 0 && res.data.data) {
          setCategory3(res.data.data);
        }
      });
      getADSApi({
        device_type: "web",
        limit: 10,
        display_position: 11,
        page_type: 1,
      }).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setAdsBlock3(res.data.data.list || []);
        }
      });
    }
    if (category_slug4) {
      getArticlesByCategorySlugClient(category_slug4, 4).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setListArticle4(res.data.data.list);
        }
      });

      getCategoryDetail(category_slug4).then((res) => {
        if (res.data.status > 0 && res.data.data) {
          setCategory4(res.data.data);
        }
      });
      getADSApi({
        device_type: "web",
        limit: 10,
        display_position: 12,
        page_type: 1,
      }).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setAdsBlock4(res.data.data.list || []);
        }
      });
    }
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-col-reverse">
        <section className={`pt-8 pb-5 px-4 2xl:px-0 ${mulish.className}`}>
          <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex flex-col">
              {listArticle1.length > 0 && (
                <div className="flex flex-col lg:hidden">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                    >
                      {category1 && (
                        <Link href={`/tin-tuc/${category1.menu_slug}`}>
                          {category1.menu_name}
                        </Link>
                      )}
                    </div>
                    <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
                  </div>

                  {listArticle1.length > 0 && (
                    <PageTypeMB1
                      hrefL={`/${listArticle1[0].article_type_slug}/${listArticle1[0].category_slug}/${listArticle1[0].article_slug}`}
                      tagg={false}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 mt-5`}
                      classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                      linkImage={listArticle1[0].avatar_image}
                      classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                      title={listArticle1[0].article_title}
                      classTag={``}
                      tag={``}
                      classDes={``}
                      des={``}
                      altImage={`img1`}
                    />
                  )}
                  <div className="flex flex-col w-full mt-6">
                    {listArticle1
                      .filter((e, i) => i !== 0)
                      .map((e, i, arr) => {
                        return (
                          <PageTypeMB2
                            hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                            key={i}
                            sizeImage={{ width: 1920, height: 1080 }}
                            classDiv={`flex items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                              i === arr.length - 1
                                ? ""
                                : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                            }`}
                            classImage={`object-cover w-[150px] h-[100px] mr-4 flex-shrink-0 lg:mr-[30px] flex-shrink-0`}
                            linkImage={e.avatar_image}
                            classDes={`text-[#303030] `}
                            des={e.article_title}
                            altImage={`img2`}
                          />
                        );
                      })}
                  </div>
                </div>
              )}

              {listArticle2.length > 0 && (
                <div className="flex flex-col lg:hidden">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                    >
                      {category2 && (
                        <Link href={`/tin-tuc/${category2.menu_slug}`}>
                          {category2.menu_name}
                        </Link>
                      )}
                    </div>
                    <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
                  </div>
                  {listArticle2.length > 0 && (
                    <PageTypeMB1
                      hrefL={`/${listArticle2[0].article_type_slug}/${listArticle2[0].category_slug}/${listArticle2[0].article_slug}`}
                      tagg={false}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 mt-5`}
                      classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                      linkImage={listArticle2[0].avatar_image}
                      classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                      title={listArticle2[0].article_title}
                      classTag={``}
                      tag={``}
                      classDes={``}
                      des={``}
                      altImage={`img1`}
                    />
                  )}
                  <div className="flex flex-col w-full mt-6">
                    {listArticle2
                      .filter((e, i) => i !== 0)
                      .map((e, i, arr) => {
                        return (
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
                            linkImage={e.avatar_image}
                            classDes={`text-[#303030] `}
                            des={e.article_title}
                            altImage={`img2`}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
              {listArticle3.length > 0 && (
                <div className="flex flex-col lg:hidden">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                    >
                      {category3 && (
                        <Link href={`/tin-tuc/${category3.menu_slug}`}>
                          {category3.menu_name}
                        </Link>
                      )}
                    </div>
                    <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
                  </div>

                  {listArticle3.length > 0 && (
                    <PageTypeMB1
                      hrefL={`/${listArticle3[0].article_type_slug}/${listArticle3[0].category_slug}/${listArticle3[0].article_slug}`}
                      tagg={false}
                      sizeImage={{ width: 1920, height: 1080 }}
                      classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0 mt-5`}
                      classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                      linkImage={listArticle3[0].avatar_image}
                      classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                      title={listArticle3[0].article_title}
                      classTag={``}
                      tag={``}
                      classDes={``}
                      des={``}
                      altImage={`img1`}
                    />
                  )}
                  <div className="flex flex-col w-full mt-6">
                    {listArticle3
                      .filter((e, i) => i !== 0)
                      .map((e, i, arr) => {
                        return (
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
                            linkImage={e.avatar_image}
                            classDes={`text-[#303030] `}
                            des={e.article_title}
                            altImage={`img2`}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
            <div className="hidden lg:flex lg:space-x-8">
              <div className="flex flex-col">
                {listArticle1.length > 0 && (
                  <div className="flex flex-col w-full">
                    {/* justify-between */}
                    <div className="flex flex-col lg:flex-row lg:items-center">
                      <div
                        className={`text-[#212529] lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                      >
                        <Link href={`/tin-tuc/${category1?.menu_slug}`}>
                          {category1 && category1.menu_name}
                        </Link>
                      </div>
                      {/* <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[350px] border-[#CED1D8]  2xl:w-full" /> */}
                      <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[350px] border-[#CED1D8]  flex-1" />
                      {category1 && (
                        <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%] flex-shrink-0">
                          {category1.child_menu &&
                            category1.child_menu.length > 0 &&
                            category1.child_menu
                              .filter((e, i) => i < 4)
                              .map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`text-[13px]  text-[#6c757d] ${poppins.className} flex-shrink-0`}
                                  >
                                    <Link href={`/xa-hoi/${e.menu_slug}`}>
                                      {e.menu_name}
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      )}
                      {category1 &&
                        category1.child_menu &&
                        category1.child_menu.length > 4 && (
                          <button className="dropdown-button">
                            <MoreOutlined
                              style={{ fontSize: "20px", color: "black" }}
                            />
                            {
                              <ul className="dropdown-list">
                                {category1.child_menu &&
                                  category1.child_menu.length > 0 &&
                                  category1.child_menu
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
                            }
                          </button>
                        )}
                      <div className="w-[333px] h-[1px]"></div>
                    </div>
                    <div className="flex mt-8 space-x-8">
                      <div className="flex flex-col w-[270px] flex-shrink-0 space-y-8">
                        {listArticle1
                          .filter((e, i) => i !== 0)
                          .map((e, i) => {
                            return (
                              <PageTypePC2
                                // hrefL={`/${e.article_slug}`}
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
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

                      {listArticle1.length > 0 && (
                        <PageTypePC1
                          hrefL={`/${listArticle1[0].article_type_slug}/${listArticle1[0].category_slug}/${listArticle1[0].article_slug}`}
                          time={true}
                          sizeImage={{ width: 1920, height: 1080 }}
                          classDiv={`flex flex-col w-full 2xl:w-[570px] 2xl:flex-shrink-0`}
                          classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                          linkImage={listArticle1[0].avatar_image}
                          classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                          title={listArticle1[0].article_title}
                          classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                          timeS={momentTZ
                            .utc(listArticle1[0].publish_date)
                            .tz("Asia/Ho_chi_minh")
                            .format("HH:mm DD/MM/YYYY")}
                          classDes={`text-[#303030] lg:text-[#303030]  mt-4 text-sm leading-[1.5]`}
                          des={listArticle1[0].article_sapo}
                          altImage={`img1`}
                        />
                      )}

                      <div className="w-[301px] flex flex-col gap-2 ">
                        {adsBlock1 &&
                          adsBlock1.map((ad, id) => (
                            <Link key={id} href={ad.url}>
                              <Image
                                src={ad.image_url}
                                width={301}
                                height={210}
                                className="object-cover w-[301px] h-full"
                                alt="img3"
                              />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {listArticle2.length > 0 && (
                  <div className="flex flex-col w-full mt-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <Link
                        href={{
                          pathname: `/tin-tuc/${category2?.menu_slug}`,
                        }}
                        className="flex-shrink-0"
                      >
                        <div
                          className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase `}
                        >
                          {category2 && category2.menu_name}
                        </div>
                      </Link>
                      <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] flex-1 border-[#CED1D8]  " />
                      {category2 && (
                        <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%] flex-shrink-0">
                          {category2.child_menu &&
                            category2.child_menu.length > 0 &&
                            category2.child_menu
                              .filter((e, i) => i < 4)
                              .map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`text-[13px]  text-[#6c757d] ${poppins.className} flex-shrink-0`}
                                  >
                                    <Link href={`/van-hoa/${e.menu_slug}`}>
                                      {e.menu_name}
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      )}
                      {category2 &&
                        category2.child_menu &&
                        category2.child_menu.length > 4 && (
                          <button className="dropdown-button">
                            <MoreOutlined
                              style={{ fontSize: "20px", color: "black" }}
                            />
                            {
                              <ul className="dropdown-list">
                                {category2.child_menu &&
                                  category2.child_menu.length > 0 &&
                                  category2.child_menu
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
                            }
                          </button>
                        )}
                      <div className="w-[333px] h-[1px]"></div>
                    </div>
                    <div className="flex mt-8 space-x-8">
                      <div className="flex flex-col w-[270px] flex-shrink-0 space-y-8">
                        {listArticle2
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

                      {listArticle2.length > 0 && (
                        <PageTypePC1
                          // hrefL={`/${listVH[0].article_slug}`}
                          hrefL={`/${listArticle2[0].article_type_slug}/${listArticle2[0].category_slug}/${listArticle2[0].article_slug}`}
                          time={true}
                          sizeImage={{ width: 1920, height: 1080 }}
                          classDiv={`flex flex-col w-full 2xl:w-[570px] 2xl:flex-shrink-0`}
                          classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                          linkImage={listArticle2[0].avatar_image}
                          classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                          title={listArticle2[0].article_title}
                          classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                          timeS={momentTZ
                            .utc(listArticle2[0].publish_date)
                            .tz("Asia/Ho_chi_minh")
                            .format("HH:mm DD/MM/YYYY")}
                          classDes={`text-[#303030] lg:text-[#303030]  mt-4 text-sm leading-[1.5]`}
                          des={listArticle2[0].article_sapo}
                          altImage={`img1`}
                        />
                      )}
                      <div className="w-[301px] flex flex-col gap-2 ">
                        {adsBlock2 &&
                          adsBlock2.map((ad, id) => (
                            <Link key={id} href={ad.url}>
                              <Image
                                src={ad.image_url}
                                width={301}
                                height={210}
                                className="object-cover w-[301px] h-full"
                                alt="img3"
                              />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {listArticle3.length > 0 && (
                  <div className="flex flex-col w-full mt-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <Link
                        href={{
                          pathname: `/tin-tuc/${category3?.menu_slug}`,
                        }}
                        className="flex-shrink-0"
                      >
                        <div
                          className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                        >
                          {category3 && category3.menu_name}
                        </div>
                      </Link>
                      {/* <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[400px] border-[#CED1D8]  2xl:w-full" /> */}
                      <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[350px] border-[#CED1D8]  flex-1" />
                      {category3 && (
                        <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%] flex-shrink-0">
                          {category3.child_menu &&
                            category3.child_menu.length > 0 &&
                            category3.child_menu
                              .filter((e, i) => i < 4)
                              .map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`text-[13px] ${poppins.className} text-[#6c757d] flex-shrink-0`}
                                  >
                                    <Link href={`/van-hoa/${e.menu_slug}`}>
                                      {e.menu_name}
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      )}
                      {category3 &&
                        category3.child_menu &&
                        category3.child_menu.length > 4 && (
                          <button className="dropdown-button">
                            <MoreOutlined
                              style={{ fontSize: "20px", color: "black" }}
                            />
                            {
                              <ul className="dropdown-list">
                                {category3.child_menu &&
                                  category3.child_menu.length > 0 &&
                                  category3.child_menu
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
                            }
                          </button>
                        )}
                      <div className="w-[333px] h-[1px]"></div>
                    </div>
                    <div className="flex mt-8 space-x-8">
                      <div className="flex flex-col w-[270px] flex-shrink-0 space-y-8">
                        {listArticle3
                          .filter((e, i) => i !== 0)
                          .slice(1, 3)
                          .map((e, i) => {
                            return (
                              <PageTypePC2
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
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

                      {listArticle3.length > 0 && (
                        <PageTypePC1
                          hrefL={`/${listArticle3[0].article_type_slug}/${listArticle3[0].category_slug}/${listArticle3[0].article_slug}`}
                          time={true}
                          sizeImage={{ width: 1920, height: 1080 }}
                          classDiv={`flex flex-col w-full 2xl:w-[570px] 2xl:flex-shrink-0`}
                          classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                          linkImage={listArticle3[0].avatar_image}
                          classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                          title={listArticle3[0].article_title}
                          classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                          timeS={momentTZ
                            .utc(listArticle3[0].publish_date)
                            .tz("Asia/Ho_chi_minh")
                            .format("HH:mm DD/MM/YYYY")}
                          classDes={`text-[#303030] lg:text-[#303030]  mt-4 text-sm leading-[1.5]`}
                          des={listArticle3[0].article_sapo}
                          altImage={`img1`}
                        />
                      )}
                      <div className="w-[301px] flex flex-col gap-2 ">
                        {adsBlock3 &&
                          adsBlock3.map((ad, id) => (
                            <Link key={id} href={ad.url}>
                              <Image
                                src={ad.image_url}
                                alt={ad.ad_name}
                                width={301}
                                height={625}
                                className="object-cover w-[301px] h-full"
                              />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {listArticle4.length > 0 && (
                  <div className="flex flex-col w-full mt-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <Link
                        href={{
                          pathname: `/tin-tuc/${category4?.menu_slug}`,
                        }}
                        className="flex-shrink-0"
                      >
                        <div
                          className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                        >
                          {category4 && category4.menu_name}
                        </div>
                      </Link>
                      <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[350px] border-[#CED1D8]  flex-1" />
                      {/* <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[400px] border-[#CED1D8]  2xl:w-full" /> */}
                      {category4 && (
                        <ul className="flex justify-start mt-3 lg:mt-0 space-x-3 list-disc marker:text-[#D62127] list-inside overflow-auto ctscroll flex-shrink-0 max-w-[60%] flex-shrink-0">
                          {category4.child_menu &&
                            category4.child_menu.length > 0 &&
                            category4.child_menu
                              .filter((e, i) => i < 4)
                              .map((e, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`text-[13px] ${poppins.className} text-[#6c757d] flex-shrink-0`}
                                  >
                                    <Link href={`/van-hoa/${e.menu_slug}`}>
                                      {e.menu_name}
                                    </Link>
                                  </li>
                                );
                              })}
                        </ul>
                      )}
                      {category4 &&
                        category4.child_menu &&
                        category4.child_menu.length > 4 && (
                          <button className="dropdown-button">
                            <MoreOutlined
                              style={{ fontSize: "20px", color: "black" }}
                            />
                            {
                              <ul className="dropdown-list">
                                {category4.child_menu &&
                                  category4.child_menu.length > 0 &&
                                  category4.child_menu
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
                            }
                          </button>
                        )}
                      <div className="w-[333px] h-[1px]"></div>
                    </div>
                    <div className="flex mt-8 space-x-8">
                      <div className="flex flex-col w-[270px] flex-shrink-0 space-y-8 x2">
                        {listArticle4
                          .filter((e, i) => i !== 0)
                          .slice(1, 3)
                          .map((e, i) => {
                            return (
                              <PageTypePC2
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
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

                      {listArticle4.length > 0 && (
                        <PageTypePC1
                          hrefL={`/${listArticle4[0].article_type_slug}/${listArticle4[0].category_slug}/${listArticle4[0].article_slug}`}
                          time={true}
                          sizeImage={{ width: 1920, height: 1080 }}
                          classDiv={`flex flex-col w-full 2xl:w-[570px] 2xl:flex-shrink-0`}
                          classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                          linkImage={listArticle4[0].avatar_image}
                          classTitle={`text-[18px] lg:text-[26px] lg:leading-[1.3] text-black lg:text-[#343a40] font-bold lg:font-semibold  mt-2 lg:mt-5 ${poppins.className}`}
                          title={listArticle4[0].article_title}
                          classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                          timeS={momentTZ
                            .utc(listArticle4[0].publish_date)
                            .tz("Asia/Ho_chi_minh")
                            .format("HH:mm DD/MM/YYYY")}
                          classDes={`text-[#303030] lg:text-[#303030]  mt-4 text-sm leading-[1.5]`}
                          des={listArticle4[0].article_sapo}
                          altImage={`img1`}
                        />
                      )}
                      <div className="w-[301px] flex flex-col gap-2 ">
                        {adsBlock4 &&
                          adsBlock4.map((ad, id) => (
                            <Link key={id} href={ad.url}>
                              <Image
                                src={ad.image_url}
                                alt={ad.ad_name}
                                width={301}
                                height={625}
                                className="object-cover w-[301px] h-full"
                              />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
