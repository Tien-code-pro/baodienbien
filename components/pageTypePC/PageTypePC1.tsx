"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface P {
  sizeImage: {
    width: number;
    height: number;
  };
  time: boolean;
  classDiv: string;
  classTitle: string;
  classTimeS: string;
  classDes: string;
  classImage: string;
  linkImage: string;
  title: string;
  timeS: string;
  des: String;
  altImage: string;
  hrefL: string;
  key?: number;
  srcIcon?: string;
  isMultiMedia?: number;
  classIcon?: string;
  icon?: boolean;
}

export default function PageTypePC1(props: P) {
  const {
    sizeImage,
    time,
    classDiv,
    classTitle,
    classTimeS,
    classDes,
    classImage,
    linkImage,
    title,
    timeS,
    des,
    altImage,
    hrefL,
    srcIcon,
    isMultiMedia,
    classIcon,
    icon,
  } = props;
  return (
    <Link href={hrefL} className={classDiv}>
      <Image
        src={linkImage}
        width={sizeImage.width}
        height={sizeImage.height}
        className={classImage}
        alt={altImage}
      />
      <div className="flex flex-col flex-1">
        <div className={`${classTitle} hover:text-[#D62127]`}>
          {icon ? (
            <>
              {srcIcon === "tin-bai" && (
                <>
                  {isMultiMedia && (
                    <>
                      {isMultiMedia === 2 && (
                        <Image
                          src={`/assets/images/home/icon13.png`}
                          width={20}
                          height={20}
                          className={classIcon}
                          alt="icon5"
                        />
                      )}
                      {isMultiMedia === 1 && (
                        <Image
                          src={`/assets/images/home/icon11.png`}
                          width={20}
                          height={20}
                          className={classIcon}
                          alt="icon5"
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {srcIcon === "e-magazine" && (
                <Image
                  src={`/assets/images/home/icon10.png`}
                  width={20}
                  height={20}
                  className={classIcon}
                  alt="icon5"
                />
              )}
              {srcIcon === "audio" && (
                <Image
                  src={`/assets/images/home/icon12.png`}
                  width={20}
                  height={20}
                  className={classIcon}
                  alt="icon5"
                />
              )}
              {srcIcon === "video" && (
                <Image
                  src={`/assets/images/home/icon5.png`}
                  width={20}
                  height={20}
                  className={classIcon}
                  alt="icon5"
                />
              )}
              {!srcIcon && <></>}
            </>
          ) : (
            ""
          )}
          {title}
        </div>
        {time ? (
          <div className={`${classTimeS}`}>
            {/*Bắt validate từ ở ngoài*/}
            {/*{moment(timeS).format("DD/MM/YYYY HH:mm:ss")}*/}
            {timeS}
          </div>
        ) : (
          ""
        )}
        <div className={`${classDes}`}>{des}</div>
      </div>
    </Link>
  );
}
