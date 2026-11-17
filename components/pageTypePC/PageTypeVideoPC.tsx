"use client";
import moment from "moment";
import videojs from "video.js";
import React, { useEffect, useRef } from "react";
import "video.js/dist/video-js.css";
import Image from "next/image";
interface P {
  sizeImage: {
    width: string;
    height: string;
  };
  time: boolean;
  pen_name: string;
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
}

export default function PageTypeVideoPC(props: P) {
  const {
    sizeImage,
    time,
    pen_name,
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

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videojs(videoRef.current, {
        sources: [
          {
            src: `${linkImage}`,
            // src: `https://video-dienbien.vtcplay.vn/helloworld2_10_35_19/playlist.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
      });
    }
  }, [linkImage]);

  return (
    <div className={classDiv}>
      <div className="albari_danhmucvideoal flex justify-center">
        <video
          controls
          // autoPlay={true}
          className="video-js w-full"
          width={sizeImage.width}
          height={sizeImage.height}
          ref={videoRef}
        />
      </div>

      {/*<Image*/}
      {/*    src={linkImage}*/}
      {/*    width={sizeImage.width}*/}
      {/*    height={sizeImage.height}*/}
      {/*    className={classImage}*/}
      {/*    alt={altImage}*/}
      {/*/>*/}
      <div className="flex flex-col flex-1">
        <div className="flex flex-row mt-6 lg:mt-7 gap-1">
          {/* <Image
            src={`/assets/images/home/icon5.png`}
            width={20}
            height={20}
            className="w-[40px] h-[40px]"
            alt="icon5"
          /> */}
          <div className={`${classTitle} hover:text-[#D62127]`}>{title}</div>
        </div>
        {pen_name} {pen_name && "|"}{" "}
        {time ? (
          <div className={`${classTimeS}`}>
            {moment(timeS).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        ) : (
          ""
        )}
        <div className={`${classDes}`}>{des}</div>
      </div>
    </div>
  );
}
