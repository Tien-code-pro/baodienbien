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
  key?: number;
  altImage: string;
  hrefL: string;
}

export default function PageTypePC4(props: P) {
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
        {time ? <div className={`${classTimeS} `}>{timeS}</div> : ""}
        <div className={`${classTitle}`}>
          {icon ? (
            <Image
              src={`/assets/images/home/icon5.png`}
              width={20}
              height={20}
              className={iconClass}
              alt="icon5"
            />
          ) : (
            ""
          )}
          {title}
        </div>
        <div className={`${classDes}`}>{des}</div>
      </div>
    </Link>
  );
}
