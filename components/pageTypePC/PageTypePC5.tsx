"use client";
import {
  handleBookmarkArticle,
  handleDeleteBookmarkArticle,
} from "@/services/client-side/services-api/serviceTung-api";
import { renderImage } from "@/utils/log-helper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FacebookShareButton } from "react-share";
interface P {
  sizeImage: {
    width: number;
    height: number;
  };
  slug?: string;
  num: number;
  classDiv: string;
  classTitle: string;
  classImage: string;
  linkImage: string;
  title: string;
  altImage: string;
  hrefL: string;
  day: string;
  loai: string;
  check: boolean;
  key?: number;
}

export default function PageTypePC5(props: P) {
  const {
    sizeImage,
    classDiv,
    classTitle,
    classImage,
    linkImage,
    title,
    altImage,
    hrefL,
    num,
    day,
    loai,
    check,
    slug,
  } = props;
  const [isBookmark, setIsBookMark] = useState(true);
  const handleArticleSave = () => {
    if (isBookmark) {
      handleDeleteBookmarkArticle({
        article_slug: slug || 0,
      }).then((res) => {
        if (res && res.data && res.data.status > 0) {
          setIsBookMark(true);
        }
      });
    } else {
      handleBookmarkArticle({
        article_slug: slug || 0,
      }).then((res) => {
        if (res && res.data && res.data.status > 0) {
          setIsBookMark(false);
        }
      });
    }
  };

  return (
    <div className={classDiv}>
      <Link href={hrefL} className="flex-shrink-0">
        {altImage && (
          <Image
            src={renderImage(linkImage)}
            width={sizeImage.width}
            height={sizeImage.height}
            className={classImage}
            alt={altImage}
          />
        )}
      </Link>
      <div className="flex flex-col w-full">
        <Link href={hrefL} className={`${classTitle} hover:text-[#D62127]`}>
          {title}
        </Link>
        {check ? (
          <>
            <div className="flex justify-between">
              <div className="hidden lg:flex text-sm text-[#9F9F9F]">
                {loai}
                {` - `}
                {day}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-[#B42652] cursor-pointer">
                  <Image
                    src={`/assets/images/home/binhluan.svg`}
                    width={20}
                    height={20}
                    alt="binhluan"
                    className="mr-1 object-contain"
                  />
                  {num}
                </div>
                <div className="flex items-center relative group/mn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3298 12.8377L17.8269 8.41512L17.8841 8.34968C18.0558 8.12058 18.0367 7.78916 17.8268 7.58283L13.3297 3.16165L13.268 3.10864C12.9078 2.83964 12.3776 3.09805 12.3776 3.57782V5.70757L12.153 5.72268C8.59039 6.00547 6.50344 8.25989 6.00472 12.3501C5.94067 12.8754 6.54318 13.2042 6.93261 12.8564C8.36448 11.5779 9.84382 10.784 11.3776 10.4657C11.6236 10.4147 11.871 10.3759 12.1199 10.3493L12.3776 10.3261V12.4216L12.3829 12.5039C12.4429 12.9566 12.992 13.1699 13.3298 12.8377ZM12.2263 6.72L13.3776 6.64256V4.61104L16.8238 7.99905L13.3776 11.3882V9.23223L12.022 9.35403L12.0136 9.35493C10.3113 9.53692 8.70337 10.2189 7.18674 11.3555C7.48493 10.0174 7.99417 9.01008 8.6632 8.28852C9.49235 7.39426 10.6526 6.84605 12.2263 6.72ZM5.5 4C4.11929 4 3 5.11929 3 6.5V14.5C3 15.8807 4.11929 17 5.5 17H13.5C14.8807 17 16 15.8807 16 14.5V13.5C16 13.2239 15.7761 13 15.5 13C15.2239 13 15 13.2239 15 13.5V14.5C15 15.3284 14.3284 16 13.5 16H5.5C4.67157 16 4 15.3284 4 14.5V6.5C4 5.67157 4.67157 5 5.5 5H8.5C8.77614 5 9 4.77614 9 4.5C9 4.22386 8.77614 4 8.5 4H5.5Z"
                      fill="#757575"
                    ></path>
                  </svg>
                  <div className="z-[9999] bg-white hidden group-hover/mn:flex absolute top-full right-0 flex-col [border:1px_solid_#e5e5e5] shadow-[0px_1px_4px_rgba(0,_0,_0,_0.2)] w-[140px] p-[10px] rounded">
                    <FacebookShareButton
                      url={"https://dienbien.vtcplay.vn/"}
                      windowHeight={2000}
                      // quotes={quotes} //"Your Quotes"
                      // hashtag={hashtag} // #hashTag
                    >
                      <div className="flex items-center text-sm text-[#9F9F9F] group/mnn hover:text-[#1977f3] cursor-pointer [border-bottom:1px_solid_#E5E5E5] mb-[10px] pb-[10px]">
                        <svg
                          className="mr-2 w-4 h-4 lg:w-5 lg:h-5 group-hover/mnn:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#9f9f9f"
                            d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.3V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0 -48-48z"
                          />
                        </svg>
                        <svg
                          className="mr-2 w-4 h-4 lg:w-5 lg:h-5 hidden group-hover/mnn:block "
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#1977f3"
                            d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.3V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0 -48-48z"
                          />
                        </svg>
                        Facebook
                      </div>
                    </FacebookShareButton>
                    <div className="flex items-center text-sm text-[#9F9F9F] group/mnn hover:text-[#1977f3] cursor-pointer">
                      <svg
                        className="mr-2 w-4 h-4 lg:w-5 lg:h-5 group-hover/mnn:hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#9f9f9f"
                          d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"
                        />
                      </svg>
                      <svg
                        className="mr-2 w-4 h-4 lg:w-5 lg:h-5 hidden group-hover/mnn:block "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#1977f3"
                          d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"
                        />
                      </svg>
                      Twitter
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleArticleSave}
                  className="flex items-center cursor-pointer"
                >
                  <Image
                    src={`/assets/images/home/${
                      isBookmark ? "danhdauactive" : "danhdau"
                    }.svg`}
                    width={20}
                    height={20}
                    alt="danhdau"
                    className="object-contain"
                  />
                  {/* <Image
                    src={`/assets/images/home/danhdauactive.svg`}
                    width={20}
                    height={20}
                    alt="danhdau"
                    className="object-contain"
                  /> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
