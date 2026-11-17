"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import {
  getArticlesByCategorySlugClient,
  getCategoryDetail,
} from "@/services/client-side/services-api/service1";
import { Article, CategoryMenuResponse } from "@/types/articleNews";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function TinQuangCao() {
  const [categoryMenu, setCategoryMenu] = useState<CategoryMenuResponse>();
  const [listTinQuangCao, setListTinQuangCao] = useState<Article[]>([]);
  useEffect(() => {
    getArticlesByCategorySlugClient("thong-tin-quang-cao", 4).then((res) => {
      if (
        res.data &&
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list
      ) {
        setListTinQuangCao(res.data.data.list);
      }
    });
    getCategoryDetail("thong-tin-quang-cao").then((res) => {
      if (res.data && res.data.status > 0 && res.data.data) {
        setCategoryMenu(res.data.data);
      }
    });
  }, []);
  return (
    <>
      <section
        className={`bg-[#E5E9F0] px-4 2xl:px-0 ${mulish.className} lg:mt-10`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex-col flex">
            <div className="py-5 lg:py-[35px] ">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div
                  className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0 lg:hidden`}
                >
                  Tin quảng cáo
                </div>
                <Link
                  className='flex-shrink-0'
                  href={{
                    pathname: `/chuyen-muc/thong-tin-quang-cao`,
                  }}
                >
                  <div
                    className={`text-[#212529] mx-auto lg:ml-0 text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0 hidden lg:block`}
                  >
                    Thông tin - Quảng cáo
                  </div>
                </Link>
                <hr className="hidden lg:block mx-4 xl:mx-8 w-[50px] xl:w-[300px] border-[#CED1D8] 2xl:w-full" />
                <ul className="hidden lg:flex justify-start mt-3 lg:mt-0 space-x-3 list-disc list-inside overflow-auto ctscroll">
                  {categoryMenu &&
                    categoryMenu.child_menu &&
                    categoryMenu.child_menu.length > 0 && (
                      <>
                        {categoryMenu.child_menu.map((c, i) => {
                          <Link href={`/tin-tuc/${c.menu_slug}`}>
                            <li
                              className={`text-[#888888] text-sm  ${mulish.className} flex-shrink-0`}
                              key={i}
                            >
                              {c.menu_name}
                            </li>
                          </Link>;
                        })}
                      </>
                    )}
                </ul>
              </div>
              <div className="flex flex-col lg:flex-row justify-between lg:mt-[35px] lg:space-x-8 ">
                <div className="mt-8 lg:mt-0 ">
                  <div className="flex flex-wrap -mx-3 ">
                    {listTinQuangCao.map((e, i) => {
                      return (
                        <PageTypePC2
                          hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                          key={i}
                          sizeImage={{ width: 150, height: 100 }}
                          icon={false}
                          classIcon={``}
                          classDiv={`flex flex-col lg:flex-row lg:items-center mx-3 w-[calc(50%_-_24px)] lg:w-[calc(25%_-_24px)] mb-9`}
                          classText={`text-[#343a40] leading-[1.4] font-medium mt-3 lg:mt-0  relative ${poppins.className}`}
                          classImage={`object-cover w-full h-[100px] lg:w-[120px] lg:h-[80px] lg:mr-5`}
                          linkImage={`${e.avatar_image}`}
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
    </>
  );
}
