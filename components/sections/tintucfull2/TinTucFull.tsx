"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Shares2 from "../tin-chi-tiet/Shares2";
import { poppins } from "@/components/hooks/font";
import Link from "next/link";
import { Article } from "@/types/articleNews";
import { isMobile } from "react-device-detect";

export default function TinTucFull({
  slug,
  article,
}: {
  slug: string | undefined;
  article: Article;
}) {
  useEffect(() => {
    if (isMobile) {
      const listText = document.querySelectorAll(
        "*[style='margin-bottom: 20px;width:50%;']"
      );
      if (listText.length > 0) {
        listText.forEach((e, i) => {
          e.setAttribute("style", "margin-bottom: 20px;width:100%;");
        });
      }
    }
  }, [isMobile]);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-[0_2px_4px_rgba(0,_0,_0,_.1)]">
        <div className="container px-4 2xl:px-0 mx-auto">
          <div className="flex items-center justify-between h-[50px] w-full">
            <Link className="" href="/">
              <Image
                src={`/assets/images/logo.png`}
                width={184}
                height={40}
                className="object-contain h-[40px]"
                alt="logo"
              />
            </Link>
            <div
              className={`${poppins.className} hidden lg:block font-bold text-[22px] leading-[1.3] text-[#343a40] uppercase`}
            >
              {article?.category_name}
            </div>

            <div className="lg:hidden">
              <Shares2 slug="" />
            </div>
            <div className="hidden lg:flex">
              <Link
                href="/da-phuong-tien/emagazine"
                className={`${poppins.className} font-bold text-sm leading-[1.3] text-[#343a40] uppercase flex items-center`}
              >
                Quay về
                <Image
                  src={`/assets/images/tttk/Vector.png`}
                  width={20}
                  height={20}
                  className="object-contain -rotate-90 ml-3"
                  alt="back"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
