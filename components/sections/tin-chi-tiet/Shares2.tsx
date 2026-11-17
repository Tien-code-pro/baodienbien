"use client";
import useFont from "@/components/hooks/useFont";
import PageTypeMB1 from "@/components/pageTypeMB/PageTypeMB1";
import PageTypeMB2 from "@/components/pageTypeMB/PageTypeMB2";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import {
  handleBookmarkArticle,
  handleCheckBookMark,
  handleDeleteBookmarkArticle,
} from "@/services/client-side/services-api/serviceTung-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
import DangNhap from "@/components/modals/DangNhap";
import { useDispatch } from "react-redux";
import appSlice from "@/app/appSlice";

export default function Shares2({ slug }: { slug: string }) {
  const { refresh, isLogin, loadingLogin, modal } = useAppSelector(
    (state: RootState) => state.app
  );
  const { updateModalState } = appSlice.actions;
  const dispatch = useDispatch();
  const [isBookMark, setIsBookMark] = useState<boolean>(false);
  useEffect(() => {
    if (isLogin) {
      handleCheckBookMark({ article_slug: slug }).then((res) => {
        if (res && res.data && res.data.status > 0 && res.data.data) {
          setIsBookMark(res.data.data === 0 ? false : true);
        }
      });
    }
  }, [isLogin]);
  return (
    <>
      <div className="flex items-center space-x-2">
        <button>
          <Image
            width={36}
            height={36}
            src={`/assets/images/tinchitiet/fa.png`}
            alt="Facebook"
            className={`object-contain`}
          />
        </button>
        <button>
          <Image
            width={36}
            height={36}
            src={`/assets/images/tinchitiet/tw.png`}
            alt="Tw"
            className={`object-contain`}
          />
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
