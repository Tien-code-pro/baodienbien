"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { ShortVideoType } from "@/types/articleNews";

export default function VideoPlayer({ short }: { short: ShortVideoType }) {
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 absolute top-20 lg:top-0 w-full lg:h-[100px] lg:bg-transparent rounded-tl-[20px] rounded-tr-[20px]">
        <button onClick={() => setPlay(!play)} className="relative z-10">
          {!play ? (
            <Image
              src={`/assets/images/popup/play-03.png`}
              width={36}
              height={36}
              className=" object-contain size-[36px] [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(7439%)_hue-rotate(108deg)_brightness(104%)_contrast(88%)]"
              alt="play-03"
            />
          ) : (
            <Image
              src={`/assets/images/popup/pauseIcon.png`}
              width={36}
              height={36}
              className="relative z-10 object-contain size-[36px] [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(7439%)_hue-rotate(108deg)_brightness(104%)_contrast(88%)]"
              alt="play-03"
            />
          )}
        </button>
        {!muted ? (
          <button onClick={() => setMuted(!muted)} className="relative z-10">
            <Image
              src={`/assets/images/popup/volume-05.png`}
              width={48}
              height={48}
              className="object-contain "
              alt="volume-05"
            />
          </button>
        ) : (
          <button
            onClick={() => setMuted(!muted)}
            className="relative z-10 after:absolute after:content-['/'] after:rotate-[10deg] after:-top-1 after:left-4 after:text-white after:text-[40px] after:font-bold"
          >
            <Image
              src={`/assets/images/popup/volume-05.png`}
              width={48}
              height={48}
              className="object-contain "
              alt="volume-05"
            />
          </button>
        )}
      </div>
      {/* 450 x567 */}
      <div className="w-full h-[100vh] lg:h-[90vh] lg:w-[450px] object-cover mx-auto max-h-full bg-[#4B4B4B] video-fulll rounded-[20px] overflow-hidden">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={short.file_url}
          volume={0.5}
          playing={play}
          playsinline={true}
          // muted={muted}

          // onReady={(e) => {
          //   const player = e.getInternalPlayer();
          //   player.setAttribute("muted", "false");
          // }}
        />
      </div>
    </>
  );
}
