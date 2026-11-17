"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface P {
  sizeImage: {
    width: number;
    height: number;
  };
  icon: boolean;
  classIcon: string;
  classDiv: string;
  classText: string;
  classImage: string;
  linkImage: string;
  desText: string;
  altImage: string;
  hrefL: string;
  srcIcon?: string;
  key?: string | number;
  isMultiMedia?: number;
}

export default function PageTypePC2(props: P) {
  const {
    sizeImage,
    icon,
    classIcon,
    classDiv,
    classText,
    classImage,
    linkImage,
    desText,
    altImage,
    hrefL,
    key,
    srcIcon,
    isMultiMedia,
  } = props;

  return (
    <Link href={hrefL} className={classDiv} key={key}>
      <Image
        src={linkImage}
        width={sizeImage.width}
        height={sizeImage.height}
        className={classImage}
        alt={altImage}
      />
      <div className={`${classText} hover:text-[#D62127]`}>
        {icon && (
          <>
            {srcIcon === "tin-bai" && (
              <>
                {!!isMultiMedia && (
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
        )}
        {desText}
        {/*<div className={srcIcon === "tin-bai" ? 'lg:!indent-0' :''}>*/}
        {/*  {desText}*/}
        {/*</div>*/}
      </div>
    </Link>
  );
}
