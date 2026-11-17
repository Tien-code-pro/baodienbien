"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface P {
  sizeImage: {
    width: number;
    height: number;
  };
  tagg: boolean;
  classDiv: string;
  classTitle: string;
  classTag: string;
  classDes: string;
  classImage: string;
  linkImage: string;
  title: string;
  tag: string;
  des: String;
  altImage: string;
  hrefL: string;
}

export default function PageTypeMB1(props: P) {
  const {
    sizeImage,
    tagg,
    classDiv,
    classTitle,
    classTag,
    classDes,
    classImage,
    linkImage,
    title,
    tag,
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
        <div className={`${classTitle} hover:text-[#D62127]`}>{title}</div>
        {tagg ? <div className={`${classTag}`}>{tag}</div> : ""}
        <div className={`${classDes}`}>{des}</div>
      </div>
    </Link>
  );
}
