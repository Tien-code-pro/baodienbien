"use client";
import useFont from "@/components/hooks/useFont";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { isMobile } from "react-device-detect";

export default function TinTaiTro() {
  const { mulish } = useFont();
  const { barlow } = useFont();
  const { poppins } = useFont();

  return (
    <>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} pt-7 lg:pt-9 lg:pb-10 hidden lg:flex`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
            >
              Tin tài trợ
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full mt-5 " />
          </div>
          <div className="flex flex-wrap -mx-[15px] mt-10 ">
            {Array(6)
              .fill(0)
              .map((e, i) => {
                return (
                  <PageTypePC2
                    hrefL={`/tin-chi-tiet`}
                    key={i}
                    sizeImage={{ width: 370, height: 200 }}
                    icon={false}
                    classIcon={``}
                    classDiv={`flex flex-col mx-3 w-[calc(100%_/3_-_30px)]  mb-9`}
                    classText={`mt-6 ${barlow.className} text-[#303030] text-2xl font-bold`}
                    desText={`Học sinh cả nước khai giảng ngày 5-9, riêng lớp 1 tựu trường sớm hơn 2 tuần`}
                    classImage={`object-cover w-full h-[200px]`}
                    linkImage={`/assets/images/home/img2.jpg`}
                    altImage={`img2`}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
