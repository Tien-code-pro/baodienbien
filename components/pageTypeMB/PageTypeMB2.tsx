"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface P {
  sizeImage: {
    width: number;
    height: number;
  };

  classDiv: string;
  classDes: string;
  classImage: string;
  linkImage: string;
  des: String;
  altImage: string;
  hrefL: string;
}

export default function PageTypeMB2(props: P) {
  const {
    sizeImage,
    classDiv,
    classDes,
    classImage,
    linkImage,
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
      <div className={`${classDes} hover:text-[#D62127]`}>{des}</div>
    </Link>
  );
}
