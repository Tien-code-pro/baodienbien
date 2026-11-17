"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import { isMobile } from "react-device-detect";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import PageTypePC3 from "@/components/pageTypePC/PageTypePC3";
import React, { useEffect, useState } from "react";
import { Article } from "@/types/articleNews";
import { getMultiMediaCSR } from "@/services/client-side/services-api/service-api-tien";
import Image from "next/image";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const DaPhuongTien = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dataMediaNew, setDataMediaNew] = useState<Article[]>([]);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(0);
  const offset = (page - 1) * 8;

  useEffect(() => {
    getMultiMediaCSR(0, 8).then((res) => {
      if (res && res.data.status > 0) {
        setDataMediaNew(res.data.data.list);
        setTotal(res.data.data.total);
      }
    });
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    const offsetCheck = page * 8;
    try {
      getMultiMediaCSR(offset, 8).then((res) => {
        if (res && res.data.status > 0) {
          setTotal(res.data.data.total);
          setDataMediaNew((prev) => [...prev, ...res.data.data.list]);
          setPage((prevPage) => prevPage + 1);
        }
      });
    } catch (error) {
      console.error("Error loading more Media:", error);
    } finally {
      if (offsetCheck >= total) {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={`px-4 2xl:px-0 ${mulish.className} my-4`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div
              className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
            >
              Văn hóa giải trí
            </div>
          </div>
        </div>
      </section>
      <section className={`relative 2xl:p-0 z-10`}>
        <img
          src="/assets/images/vanhoagiaitri/bgn1.jpg"
          alt="img"
          // fill
          className="absolute w-full h-full object-cover top-0 left-0 right-0 bottom-0 -z-10"
        />
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex flex-col  px-4 py-[30px]">
            <div
              className={`${poppins.className} text-[26px] leading-[1.3] lg:text-[48px] lg:leading-[60px] font-semibold lg:font-bold text-justify text-white mb-[10px] lg:mb-4`}
            >
              Podcast tản văn : Dập dìu những cánh thiên di
            </div>
            <div
              className={`${
                isMobile ? `${mulish.className}` : `${barlow.className}`
              } text-sm lg:text-[18px] font-normal lg:font-bold text-white text-center`}
            >
              Võ thị thu hương | 26/10/2024 18:00
            </div>
            <div className="[border-top:1px_solid_rgba(255,_255,_255,_.2)] [border-bottom:1px_solid_rgba(255,_255,_255,_.2)] py-2 lg:py-0 lg:border-none my-4 lg:my-6 flex items-center justify-between lg:justify-start">
              <div className="lg:hidden">sadas</div>
              <div className="flex items-center justify-start space-x-2">
                <button>
                  <Image
                    width={32}
                    height={32}
                    src={`/assets/images/tinchitiet/fa.png`}
                    alt="Facebook"
                    className={`object-contain lg:w-9 lg:h-9`}
                  />
                </button>
                <button>
                  <Image
                    width={32}
                    height={32}
                    src={`/assets/images/tinchitiet/tw.png`}
                    alt="Tw"
                    className={`object-contain lg:w-9 lg:h-9`}
                  />
                </button>
                <button>
                  <Image
                    width={32}
                    height={32}
                    src={`/assets/images/tinchitiet/gg.png`}
                    alt="Tw"
                    className={`object-contain lg:w-9 lg:h-9`}
                  />
                </button>
                <button>
                  <Image
                    width={32}
                    height={32}
                    src={`/assets/images/tinchitiet/zl.png`}
                    alt="Tw"
                    className={`object-contain lg:w-9 lg:h-9`}
                  />
                </button>
              </div>
            </div>
            <hr className="hidden lg:flex [border:1px_solid_#fff] w-full mb-6" />
            <div
              className={`${
                isMobile ? `${mulish.className}` : `${barlow.className}`
              } text-[18px] lg:text-2xl font-bold text-white text-justify`}
            >
              (Baodienbienphu.vn) - Tháng Mười, hương thu đang dâng hết nét dịu
              dàng của ngày sắp cạn. Nhưng sự sống vẫn trỗi dậy từng giây trên
              cánh thiên di dập dìu giữa ban mai xanh biếc…
            </div>
          </div>
        </div>
        <div className=" py-[30px] bg-black/[0.3]">
          <div className="container mx-auto xl:max-w-[1200px] *:!bg-transparent *:!shadow-none *:!text-white lg:hidden">
            <AudioPlayer
              className="ctaudio"
              src={`https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg`}
              // onPlay={(e) => console.log("onPlay")}
              // other props here

              customIcons={{
                play: (
                  <button>
                    <Image
                      width={40}
                      height={40}
                      src={`/assets/images/vanhoagiaitri/pause.png`}
                      alt="pause"
                      className={`object-contain`}
                    />
                  </button>
                ),
                pause: (
                  <button>
                    <Image
                      width={40}
                      height={40}
                      src={`/assets/images/vanhoagiaitri/play.png`}
                      alt="play"
                      className={`object-contain`}
                    />
                  </button>
                ),
                rewind: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/prev10s.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                forward: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/next10s.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                volume: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/volume.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                volumeMute: (
                  <button className="relative">
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/volume.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white text-2xl leading-none">
                      /
                    </div>
                  </button>
                ),
              }}
              progressJumpSteps={{
                forward: 10000,
                backward: 10000,
              }}
            />
          </div>
          <div className="container mx-auto xl:max-w-[1200px] *:!bg-transparent *:!shadow-none *:!text-white hidden lg:block">
            <AudioPlayer
              className="ctaudio"
              src={`https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg`}
              // onPlay={(e) => console.log("onPlay")}
              // other props here

              customIcons={{
                play: (
                  <button>
                    <Image
                      width={40}
                      height={40}
                      src={`/assets/images/vanhoagiaitri/pause.png`}
                      alt="pause"
                      className={`object-contain`}
                    />
                  </button>
                ),
                pause: (
                  <button>
                    <Image
                      width={40}
                      height={40}
                      src={`/assets/images/vanhoagiaitri/play.png`}
                      alt="play"
                      className={`object-contain`}
                    />
                  </button>
                ),
                rewind: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/prev10s.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                forward: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/next10s.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                volume: (
                  <button>
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/volume.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                  </button>
                ),
                volumeMute: (
                  <button className="relative">
                    <Image
                      width={35}
                      height={35}
                      src={`/assets/images/vanhoagiaitri/volume.png`}
                      alt="prev10s"
                      className={`object-contain `}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white text-2xl leading-none">
                      /
                    </div>
                  </button>
                ),
              }}
              progressJumpSteps={{
                forward: 10000,
                backward: 10000,
              }}
              layout="horizontal"
              customProgressBarSection={[
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.CURRENT_TIME,
                <div key={1}>/</div>,
                RHAP_UI.DURATION,
                RHAP_UI.PROGRESS_BAR,
              ]}
              customAdditionalControls={[]}
              customControlsSection={[RHAP_UI.VOLUME_CONTROLS]}
            />
          </div>
        </div>
      </section>
      <section
        className={`px-4 2xl:px-0 ${mulish.className} pt-7 lg:pt-[50px] pb-[70px]`}
      >
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex items-center space-x-9">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
            >
              Tin tài trợ
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full" />
          </div>
          <div className="flex flex-wrap mx-auto lg:-mx-[15px] lg:mt-5 ">
            {dataMediaNew &&
              dataMediaNew.map((e, i) => {
                return (
                  <PageTypePC2
                    hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                    key={i}
                    sizeImage={{ width: 150, height: 100 }}
                    icon={true}
                    classIcon={`object-contain absolute top-0.5 lg:top-1 left-0 hidden lg:flex`}
                    classDiv={`flex items-center lg:flex-col w-full space-x-4 lg:space-y-8 lg:space-x-0 lg:w-[calc(100%_/_3_-_30px)] lg:mx-[15px] py-6 [border-bottom:0.5px_solid_#D9D9D9] lg:border-none`}
                    classText={`text-[#303030] lg:text-[#303030] lg:text-2xl lg:font-bold line-clamp-4  relative  ${
                      isMobile ? "" : barlow.className
                    }`}
                    classImage={`object-cover lg:w-full w-[150px] h-[100px] lg:h-[250px] flex-shrink-0`}
                    linkImage={`${e.avatar_image}`}
                    desText={`${e.article_title}`}
                    altImage={`img2`}
                  />
                );
              })}
          </div>
          <div className="flex items-center space-x-9 mt-10">
            <div
              className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
            >
              Podcast khác
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] w-full" />
          </div>
          <div className="flex flex-wrap mx-auto lg:-mx-[15px] lg:mt-5 ">
            {dataMediaNew &&
              dataMediaNew.map((e, i) => {
                return (
                  <PageTypePC2
                    hrefL={`${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                    key={i}
                    sizeImage={{ width: 150, height: 100 }}
                    icon={true}
                    classIcon={`object-contain absolute top-0.5 lg:top-1 left-0 hidden lg:flex`}
                    classDiv={`flex items-center lg:flex-col w-full space-x-4 lg:space-y-8 lg:space-x-0 lg:w-[calc(100%_/_3_-_30px)] lg:mx-[15px] py-6 [border-bottom:0.5px_solid_#D9D9D9] lg:border-none`}
                    classText={`text-[#303030] lg:text-[#303030] lg:text-2xl lg:font-bold line-clamp-4  relative  ${
                      isMobile ? "" : barlow.className
                    }`}
                    classImage={`object-cover lg:w-full w-[150px] h-[100px] lg:h-[250px] flex-shrink-0`}
                    linkImage={`${e.avatar_image}`}
                    desText={`${e.article_title}`}
                    altImage={`img2`}
                  />
                );
              })}
          </div>
          {hasMore && (
            <button
              className={`mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Đang tải..." : "Xem thêm"}
            </button>
          )}
          {!hasMore && (
            <div className="text-center mt-5 text-gray-500">
              Đã hiển thị tất cả.
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default DaPhuongTien;
