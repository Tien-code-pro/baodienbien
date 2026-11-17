"use client";
import { barlow, mulish, poppins } from "@/components/hooks/font";
import { isMobile } from "react-device-detect";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlockMultimedia from "@/components/blockHome/BlockMultimedia";
import { ArticleMedia, ArticleNews, child_menu } from "@/types/articleNews";
import { AdvertisementType } from "@/types/category";
import {
  getADSApi,
  getArticleMediaApi,
  getArticlesLocalApi,
} from "@/services/client-side/services-api/service1";
import { getArticleFocalNewsApi } from "@/services/client-side/services-api/serviceTung-api";
// import moment from "moment/moment";
import momentTZ from "moment-timezone";

export type PlatformAdvertisementType = {
  resultAdsWeb?: AdvertisementType | null;
  resultAdsMobile?: AdvertisementType | null;
};

export default function TamDiemDaPhuongTien() {
  const [resultArticleMedia, setResultArticleMedia] = useState<ArticleMedia[]>(
    []
  );
  const [resultArticleFocal, setResultArticleFocal] = useState<ArticleNews[]>(
    []
  );
  const [resultArticleLocal, setResultArticleLocal] = useState<child_menu[]>(
    []
  );

  // const [Ads2, setAds2] = useState<PlatformAdvertisementType[]>();
  const [Ads2Web, setAds2Web] = useState<AdvertisementType[]>();
  const [Ads2MB, setAds2MB] = useState<AdvertisementType[]>();
  const [Ads3, setAds3] = useState<AdvertisementType[]>([]);
  const [Ads4, setAds4] = useState<PlatformAdvertisementType>();
  const [Ads8, setAds8] = useState<PlatformAdvertisementType>();
  const handleFetchAds = async (display_position: number) => {
    return Promise.all([
      getADSApi({
        device_type: "web",
        display_position,
        page_type: 1, // Trang chủ
        limit: 10,
      }),
      getADSApi({
        device_type: "mobile",
        display_position,
        page_type: 1, // Trang chủ
        limit: 10,
      }),
    ]).then(([resWeb, resMobile]) => {
      if (
        resWeb.data.status > 0 &&
        resWeb.data.data &&
        resWeb.data.data.list &&
        resWeb.data.data.list.length > 0
      ) {
        switch (display_position) {
          case 2:
            setAds2Web(resWeb.data.data.list);
            break;
          case 3:
            setAds3(resWeb.data.data.list);
            break;
          case 4:
            setAds4({
              resultAdsWeb: resWeb.data.data.list[0],
            });
            break;
          case 8:
            setAds8({
              resultAdsWeb: resWeb.data.data.list[0],
            });
            break;
        }
      }
      if (
        resMobile.data.status > 0 &&
        resMobile.data.data &&
        resMobile.data.data.list &&
        resMobile.data.data.list.length > 0
      ) {
        switch (display_position) {
          case 2:
            setAds2MB(resMobile.data.data.list);
            break;
          case 3:
            setAds3(resMobile.data.data.list);
            break;
          case 4:
            setAds4({
              resultAdsMobile: resMobile.data.data.list[0],
            });
            break;
          case 8:
            setAds8({
              resultAdsMobile: resMobile.data.data.list[0],
            });
            break;
          case 8:
            setAds8({
              resultAdsMobile: resMobile.data.data.list[0],
            });
            break;
        }
      }
    });
  };
  useEffect(() => {
    getArticleMediaApi({
      limit: 5,
      offset: 0,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setResultArticleMedia(res.data.data.list);
      }
    });
    getArticleFocalNewsApi({
      article_type: "",
      limit: 20,
    }).then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setResultArticleFocal(res.data.data.list);
      }
    });
    getArticlesLocalApi().then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.child_menu &&
        res.data.data.child_menu.length > 0
      ) {
        setResultArticleLocal(res.data.data.child_menu);
      }
    });
    handleFetchAds(2);
    handleFetchAds(3);
    handleFetchAds(4);
    handleFetchAds(8);
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-col-reverse">
        {/* Đa Phương Tiện */}
        {resultArticleMedia ? (
          <BlockMultimedia listArticleMedia={resultArticleMedia} />
        ) : (
          <BlockMultimedia listArticleMedia={[]} />
        )}
        <section className={`pt-4 pb-5 px-4 2xl:px-0 ${mulish.className}`}>
          <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex flex-col lg:hidden">
              <div className="flex items-center justify-between">
                <div
                  className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                >
                  Tâm điểm
                </div>
                <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
              </div>
              <div className="flex mt-5 -mx-3 flex-wrap">
                {resultArticleFocal &&
                  resultArticleFocal.length > 0 &&
                  resultArticleFocal
                    .filter((x, y) => y >= 0 && y <= 3)
                    .map((e, i) => {
                      return (
                        <PageTypePC2
                          hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                          key={i}
                          sizeImage={{ width: 150, height: 180 }}
                          icon={false}
                          classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                          classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)]`}
                          classText={`text-[#303030] mt-3 lg:mt-4 `}
                          classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                          linkImage={`${e.avatar_image}`}
                          desText={e.article_title}
                          altImage={e.article_title}
                        />
                      );
                    })}
              </div>
              {Ads2MB &&
                Ads2MB.length > 0 &&
                Ads2MB.map((ads2, index) => {
                  return (
                    <Link target="_blank" href={ads2.url} key={index}>
                      <Image
                        src={ads2.image_url}
                        width={335}
                        height={130}
                        className="object-cover w-full h-auto mt-1 lg:mt-10 lg:hidden"
                        alt="Banner2"
                      />
                    </Link>
                  );
                })}
            </div>
            <div className="hidden lg:flex space-x-8">
              <div className="flex-1 flex flex-col w-[calc(100%_-_270px)]">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/tam-diem`}
                    className={`text-[#343a40] leading-[1.2] text-[30px] ${barlow.className} font-bold uppercase`}
                  >
                    Tâm điểm
                  </Link>
                  <hr className="w-[calc(100%_-_150px)] border-[#CED1D8]" />
                </div>
                <div className="flex flex-wrap -mx-[15px] mt-4">
                  {resultArticleFocal &&
                    resultArticleFocal.length > 0 &&
                    resultArticleFocal
                      .filter((x, y) => y >= 0 && y <= 2)
                      .map((e, i) => {
                        return (
                          <PageTypePC2
                            hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                            key={i}
                            sizeImage={{ width: 270, height: 180 }}
                            icon={false}
                            classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                            classDiv={`flex flex-col mx-[15px] w-[calc(100%_/3_-_30px)]`}
                            classText={`text-[#343a40] mt-3 lg:mt-4 text-[16px] relative font-medium leading-[1.4] ${poppins.className}`}
                            classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                            linkImage={`${e.avatar_image}`}
                            desText={e.article_title}
                            altImage={e.article_title}
                          />
                        );
                      })}
                </div>
              </div>
              <div className="w-[301px] flex flex-col mt-5">
                {Ads8 && Ads8.resultAdsWeb && (
                  <Link href={Ads8.resultAdsWeb.url}>
                    <Image
                      src={Ads8.resultAdsWeb.image_url}
                      width={301}
                      height={210}
                      className="object-cover w-full h-auto"
                      alt="img3"
                    />
                  </Link>
                )}
              </div>
            </div>
            {Ads2Web &&
              Ads2Web.length > 0 &&
              Ads2Web.map((ads2, index) => {
                return (
                  <Link key={index} href={ads2.url} target="_blank">
                    <Image
                      src={ads2.image_url}
                      width={1200}
                      height={146}
                      className="object-cover w-full h-auto  mt-1 lg:mt-10 hidden lg:block"
                      alt="Banner2"
                    />
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
      <section className={`px-4 2xl:px-0 ${mulish.className}`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div className="flex lg:space-x-4">
            <div className="flex flex-col w-full">
              {resultArticleFocal &&
                resultArticleFocal.length > 0 &&
                resultArticleFocal
                  .filter((x, y) => y > 2 && y <= (isMobile ? 9 : 12))
                  .map((e, i, arr) => {
                    return (
                      <PageTypePC1
                        hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                        key={i}
                        time={true}
                        sizeImage={{ width: 1920, height: 1080 }}
                        classDiv={`flex items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                          i === arr.length - 1
                            ? ""
                            : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                        }`}
                        classImage={`object-cover w-[150px] h-[100px] lg:w-[270px] lg:h-[180px] mr-4 lg:mr-[30px]`}
                        linkImage={`${e.avatar_image}`}
                        classTitle={`text-[#343a40]  lg:text-[22px] lg:block lg:leading-[1.3]
                            
                          font-semibold ${poppins.className}`}
                        title={e.article_title}
                        classTimeS={`hidden lg:flex my-3 text-[#6c757d] text-[13px] leading-[1.5]`}
                        timeS={momentTZ
                          .utc(e.publish_date)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("HH:mm DD/MM/YYYY")}
                        classDes={`hidden my-3 text-[#303030] text-[14px] lg:block lg:leading-[1.5]`}
                        des={e.article_sapo}
                        altImage={e.article_title}
                      />
                    );
                  })}
            </div>
            {/*  */}
            <div className="hidden flex-col lg:flex mt-5 w-[301px] flex-shrink-0 [border-top:1px_solid_#D62127]">
              <div className="flex flex-col bg-[#F5F7F9] pb-7">
                <Link href={`/tin-tuc/tin-dia-phuong`}>
                  <div className="text-[#434343] font-semibold px-4 text-[22px] mt-4 mb-7">
                    Tin Địa Phương
                  </div>
                </Link>
                <div className="flex flex-col px-5 space-y-5">
                  {resultArticleLocal &&
                    resultArticleLocal.length > 0 &&
                    resultArticleLocal.map((e, i, arr) => {
                      return (
                        <Link href={`/tin-dia-phuong/${e.menu_slug}`} key={i}>
                          <div
                            key={i}
                            className={`flex items-center text-xl text-black font-medium`}
                          >
                            <Image
                              src={`/assets/images/home/icon4.png`}
                              width={24}
                              height={24}
                              className="object-contain mr-3"
                              alt="icon4"
                            />
                            {e.menu_name}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
              <div className="mt-[20px]">
                <iframe
                  src="https://nhandan.vn/widget.html"
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  scrolling="no"
                  // marginHeight="0"
                  // marginwidth="0"
                ></iframe>
              </div>
              {Ads3 &&
                Ads3.map((item, index) => (
                  <Link key={index} href={item.url}>
                    <Image
                      src={item.image_url}
                      width={300}
                      height={238}
                      className="object-cover w-full h-auto mt-[30px]"
                      alt="img6"
                    />
                  </Link>
                ))}
            </div>
          </div>
          {Ads4 && Ads4.resultAdsWeb && (
            <Link href={Ads4.resultAdsWeb.url} target="_blank">
              <Image
                src={Ads4.resultAdsWeb.image_url}
                width={1200}
                height={430}
                className="object-cover w-full h-[430px] mt-8 hidden lg:block"
                alt="img5"
              />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
