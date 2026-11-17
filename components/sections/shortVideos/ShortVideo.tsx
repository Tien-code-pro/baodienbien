import { barlow, mulish, poppins } from "@/components/hooks/font";
import useFont from "@/components/hooks/useFont";

import PageTypePC4 from "@/components/pageTypePC/PageTypePC4";
import { getListShortVideo } from "@/services/client-side/services-api/serviceTung-api";
import { ShortVideoType } from "@/types/articleNews";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ShortVideo() {
  const [list, setList] = useState<ShortVideoType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTottal] = useState(0);
  useEffect(() => {
    getListShortVideo({ pageNum: page, pageSize: 8 }).then((res) => {
      if (res && res.data.status > 0) {
        setList(res.data.data.list);
        setTottal(res.data.data.total);
      }
    });
  }, [page]);
  return (
    <>
      <section className={`${mulish.className} pt-8 px-4 2xl:px-0 pb-10`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div
              className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
            >
              Short Video
            </div>
          </div>
          <hr className="[border-bottom:1px_solid_#CED1D8] my-5 " />
          <div className="flex flex-wrap -mx-2 lg:-mx-[15px] mt-10">
            {list.length > 0 ? (
              list.map((e, i) => {
                return (
                  <PageTypePC4
                    hrefL={`/short-video/${e.slug}`}
                    key={i}
                    time={true}
                    sizeImage={{ width: 1920, height: 1080 }}
                    classDiv={`flex flex-col w-full lg:flex-shrink-0 mx-2 lg:mx-[15px] w-[calc(50%_-_16px)] md:w-[calc(100%_/_3_-_16px)] lg:w-[calc(25%_-_30px)] mb-5`}
                    classImage={`object-cover w-full h-[280px] lg:h-[480px]`}
                    linkImage={e.avatar_image || ""}
                    classTitle={`text-[#343a40] font-medium line-clamp-5 lg:line-clamp-3 relative lg:indent-6 pl-6 lg:pl-0 hover:text-[#D62127] ${poppins.className}`}
                    title={e.article_title}
                    classTimeS={`text-[#6c757d] text-sm mt-3 mb-2`}
                    timeS={moment(e.publish_date).format("DD/MM/YYYY HH:mm")}
                    classDes={``}
                    des={``}
                    altImage={`img1`}
                    icon={true}
                    iconClass={`object-contain absolute top-0.5 left-0 `}
                  />
                );
              })
            ) : (
              <div className="text-black flex items-center justify-center mx-auto text-2xl">
                Không có short video nào
              </div>
            )}
          </div>
          {total > page * 8 && (
            <button
              onClick={() => setPage(page + 1)}
              className="mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase"
            >
              xem thêm
            </button>
          )}
        </div>
      </section>
    </>
  );
}
