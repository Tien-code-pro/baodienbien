"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface P {
  icon: boolean;
  iconClass: string;
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
  key?: number;
  hrefL: string;
  iconImage?: string
}

export default function PageTypePC3(props: P) {
  const {
    icon,
    iconClass,
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
    iconImage
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
      <div className="flex flex-col">
        <div className={`${classTitle} hover:text-[#D62127]`}>
          {iconImage ? (
            <Image
              src={iconImage || ""}
              width={20}
              height={20}
              className={iconClass}
              alt="icon5"
            />
          ) : (
            <></>
          )}
          {title}
        </div>
        {time ? <div className={`${classTimeS}`}>{timeS}</div> : ""}
        <div className={`${classDes}`}>{des}</div>
      </div>
    </Link>
  );
}
