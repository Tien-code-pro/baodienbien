"use client";
import useFont from "@/components/hooks/useFont";

import PageTypePC4 from "@/components/pageTypePC/PageTypePC4";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { isMobile } from "react-device-detect";
import ReactPlayer from "react-player";

export default function ShortVideoMB() {
  const { mulish } = useFont();
  const { barlow } = useFont();
  const { poppins } = useFont();

  return (
    <>
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        url={
          "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        }
        volume={0.5}
        playing={true}
        muted={true}
        // onReady={(e) => {
        //   const player = e.getInternalPlayer();
        //   player.setAttribute("muted", "false");
        // }}
      />
    </>
  );
}
