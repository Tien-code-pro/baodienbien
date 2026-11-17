"use client";
import PageTypePC5 from "@/components/pageTypePC/PageTypePC5";
import { getListBookmark } from "@/services/client-side/auth/auth.api";
import { IArticleSave } from "@/types/profile";
import moment from "moment";
import { useEffect, useState } from "react";
import * as React from "react";

export interface ITinDaLuuProps {}

export default function TinDaLuu(props: ITinDaLuuProps) {
  const [isListArticleSave, setListArticleSave] = useState<IArticleSave[]>([]);
  useEffect(() => {
    getListBookmark(0, -1).then((res) => {
      if (res.data && res.data.status > 0 && res.data.data) {
        setListArticleSave(res.data.data.list);
      }
    });
  }, []);
  return (
    <div className="flex flex-col ">
      <div className="text-black font-bold text-xl lg:text-[22px]">
        Tin đã lưu
      </div>
      {/* <div className="mt-5 text-sm text-[#757575]">
                      Bạn chưa lưu bài viết nào.{" "}
                      <Link href={``} className="text-[#9F9F9F] underline">
                        Khám phá ngay
                      </Link>
                    </div> */}
      {isListArticleSave.length > 0 ? (
        <>
          {isListArticleSave.map((e, i) => {
            return (
              <PageTypePC5
                hrefL={`${e.article_type_slug}/${e.category_slug}/${e.slug}`}
                key={i}
                num={11}
                slug={e.slug}
                sizeImage={{ width: 150, height: 100 }}
                classDiv={`flex items-center w-full py-5 [border-bottom:0.5px_solid_#D9D9D9] lg:border-t-0`}
                classImage={`object-cover w-[150px] h-[100px] lg:w-[160px] mr-4`}
                linkImage={e.avatar_image}
                classTitle="text-[#343a40] line-clamp-3 lg:font-bold lg:line-clamp-2 leading-snug mb-2"
                title={e.article_title}
                altImage={`img1`}
                day={moment(e.create_date).format("DD/MM/YYYY")}
                loai={e.article_type_name}
                check={true}
              />
            );
          })}
        </>
      ) : (
        <div className="text-black text-center mt-10">
          Bạn chưa lưu bài viết nào.
        </div>
      )}
    </div>
  );
}
