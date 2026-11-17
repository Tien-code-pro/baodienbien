"use client";
import { getArticleTypes } from "@/services/client-side/services-api/serviceAnhht-api";
import { Article, ArticleType } from "@/types/articleNews";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
export default function SearchSection({
  search,
  searchParams,
}: {
  search: string;
  searchParams: {
    search: string | undefined;
    page: string | undefined;
    type: string | undefined;
    time_type: "day" | "week" | "month" | "year" | undefined;
  };
}) {
  const router = useRouter();

  // const selectedValue = searchParams.get("search");

  const [articleTypes, setArticleTypes] = useState<ArticleType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("tin-bai");
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(search);
  }, [search]);
  const onClick = (type: string) => {
    setSelectedType(type);
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      type: type,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url, { scroll: false });
  };
  const onChangTimeType = (type: string) => {
    setSelectedType(type);
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      time_type: type,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url, { scroll: false });
  };

  useEffect(() => {
    getArticleTypes().then((res) => {
      if (res && res.status > 0) {
        setArticleTypes(res.data.data.list || []);
      }
    });
  }, []);
  return (
    <div className="flex lg:p-5 lg:bg-[#f8f9fa] lg:mt-5 w-full">
      <div className="w-full flex items-center flex-wrap lg:justify-end lg:flex-nowrap lg:[border:1px_solid_rgba(0,_0,_0,_.1)] lg:h-[50px] space-y-[10px] lg:space-y-0 lg:space-x-2 lg:px-0.5 mt-4 rounded-[30px] bg-white">
        <input
          type="text"
          placeholder="Gõ từ khóa"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="lg:mr-auto text-[#6c757d] placeholder:text-[#6c757d] [border:1px_solid_rgba(0,_0,_0,_.1)] px-5 rounded-[30px] h-12 lg:h-[30px] lg:border-none outline-none w-full"
        />
        <div className="flex items-center w-full lg:w-auto space-x-[10px]">
          <select
            name=""
            id=""
            onChange={(e) => {
              onClick(e.target.value);
            }}
            className=" h-12 lg:h-[30px] [border:1px_solid_rgba(0,_0,_0,_.1)] rounded-[30px] text-[#6c757d] px-[10px] w-4/12 lg:w-[130px] flex-shrink-0 outline-none"
          >
            <option value="" selected>
              Tất cả
            </option>
            {articleTypes &&
              articleTypes.length > 0 &&
              articleTypes.map((type, idx) => (
                <option key={idx} value={type.article_type_slug}>
                  {type.article_type_name}
                </option>
              ))}
          </select>
          <select
            name=""
            id=""
            onChange={(e) => {
              onChangTimeType(e.target.value);
            }}
            className=" h-12 lg:h-[30px] [border:1px_solid_rgba(0,_0,_0,_.1)] rounded-[30px] text-[#6c757d] px-[10px] w-8/12 lg:w-[250px] flex-shrink-0 outline-none"
          >
            <option value="" selected>
              Sắp xếp theo ngày
            </option>
            {[
              { name: "Ngày", value: "day" },
              { name: "Tuần", value: "week" },
              { name: "Tháng", value: "month" },
              { name: "Năm", value: "year" },
            ].map((e, idx) => (
              <option key={idx} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        {
          <Link
            // href={`/tim-kiem/?search=${value}&page=1`}
            href={`/tim-kiem/?search=${value}${
              searchParams.type && searchParams.type?.length > 0
                ? `&type=${searchParams.type}`
                : ""
            }${
              searchParams.time_type && searchParams.time_type?.length > 0
                ? `&time_type=${searchParams.time_type}`
                : ""
            }&page=1`}
            // ${parseInt(searchParams.page || "1") + 1}
          >
            <button className="h-11 w-full bg-[#b40c0e] rounded-[30px] font-semibold uppercase flex items-center justify-center lg:w-[140px] flex-shrink-0 ">
              <Image
                src={`/assets/images/timkiem/search.png`}
                width={24}
                height={36}
                className="object-cover mr-2"
                alt="search"
              />
              Tìm kiếm
            </button>
          </Link>
        }
      </div>
    </div>
  );
}
