"use client";
import {
  handleBookmarkArticle,
  handleCheckBookMark,
  handleDeleteBookmarkArticle,
} from "@/services/client-side/services-api/serviceTung-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { RefObject, Suspense, useEffect, useRef, useState } from "react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
import DangNhap from "@/components/modals/DangNhap";
import { useDispatch } from "react-redux";
import appSlice from "@/app/appSlice";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { usePathname } from "next/navigation";
import { env } from "next-runtime-env";
import { Printer } from 'lucide-react';
import { useReactToPrint } from "react-to-print";
export default function Shares({ slug }: { slug: string; }) {
  const { refresh, isLogin, loadingLogin, modal } = useAppSelector(
    (state: RootState) => state.app
  );
  const { updateModalState } = appSlice.actions;
  const dispatch = useDispatch();
  const [isBookMark, setIsBookMark] = useState<boolean>(false);
  const pathname = usePathname();
  const urlShare = env("NEXT_PUBLIC_DOMAIN") + pathname;
  useEffect(() => {
    if (isLogin) {
      handleCheckBookMark({ article_slug: slug }).then((res) => {
        if (res && res.data && res.data.status > 0 && res.data.data) {
          setIsBookMark(res.data.data === 0 ? false : true);
        }
      });
    }
  }, [isLogin]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sp.zalo.me/plugins/sdk.js";
    script.async = true;
    script.onload = () => {
      //@ts-ignore
      ZaloSocialSDK.reload();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  function printElement() {
    const elementContent = document.getElementById("detail-news");
    const elementBanner = document.getElementById("banner-logo");
    if (elementContent) {
      // Save the original page's HTML
      const originalContent = document.body.innerHTML;

      // Replace the page's content with the element's content
      document.body.innerHTML = elementContent.innerHTML;
      if (elementBanner) {
        document.body.innerHTML =
          elementBanner.innerHTML + elementContent.innerHTML;
      }

      // Trigger the print dialog
      window.print();

      // Restore the original page's content
      document.body.innerHTML = originalContent;
    }
  }
  return (
    <>
      <div className="lg:sticky top-[300px] left-0 lg:-ml-20 flex items-center lg:flex-col lg:w-9 mb-4 lg:-mb-[127px] space-x-2 lg:space-x-0 lg:space-y-2">
        <FacebookShareButton
          url={urlShare}
          windowHeight={2000}
          // quotes={quotes} //"Your Quotes"
          // hashtag={hashtag} // #hashTag
        >
          <Image
            width={36}
            height={36}
            src={`/assets/images/tinchitiet/fa.png`}
            alt="Facebook"
            className={`object-contain`}
          />
        </FacebookShareButton>
        <TwitterShareButton url={urlShare} windowHeight={2000}>
          <Image
            width={36}
            height={36}
            src={`/assets/images/tinchitiet/tw.png`}
            alt="Tw"
            className={`object-contain`}
          />
        </TwitterShareButton>

        <Suspense
          fallback={
            <button className="flex flex-col items-center relative top-2 lg:static">
              <Image
                width={36}
                height={36}
                src={`/assets/images/tinchitiet/sms.png`}
                alt="Sms"
                className={`object-contain`}
              />
              <div className="mt-1 w-full h-3 rounded-[10px] bg-[#2878B7] text-[10px]">
                300
              </div>
            </button>
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="zalo-share-button" data-href="${urlShare}" data-oaid="3715812139361208758" data-layout="4" data-color="blue" data-share-type="1" data-customize="false"></div>`,
            }}
          ></div>
        </Suspense>
        <button
          onClick={() => {
            printElement();
          }}
        >
          <Printer color="black" />
        </button>

        <button
          onClick={() => {
            if (!isLogin) {
              dispatch(updateModalState(<DangNhap />));
              return;
            }
            if (isBookMark) {
              handleDeleteBookmarkArticle({
                article_slug: slug,
              }).then((res) => {
                if (res && res.data && res.data.status > 0) {
                  setIsBookMark(false);
                } else {
                  console.log(res);
                }
              });
            } else {
              handleBookmarkArticle({
                article_slug: slug,
              }).then((res) => {
                if (res && res.data && res.data.status > 0) {
                  setIsBookMark(true);
                }
              });
            }
          }}
        >
          {isBookMark ? (
            <FontAwesomeIcon
              icon={faBookmark}
              style={{ color: "#f10909" }}
              className="object-contain w-[36px] h-[36px]"
            />
          ) : (
            <Image
              width={36}
              height={36}
              src={`/assets/images/tinchitiet/tag2.png`}
              alt="Tag"
              className={`object-contain`}
            />
          )}
        </button>
      </div>
    </>
  );
}
