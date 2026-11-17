"use client";
import Image from "next/image";
import React from "react";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import useFont from "@/components/hooks/useFont";
import ReactPlayer from "react-player";

export default function ShortVideoModal() {
  const dispatch = useAppDispatch();
  const { updateModalState } = appSlice.actions;
  const { poppins } = useFont();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] bg-[#767676] flex items-center justify-center lg:py-[100px]">
        <button
          onClick={() => {
            dispatch(updateModalState(null));
          }}
          className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] absolute top-4 left-4"
        >
          <Image
            src={`/assets/images/popup/close1.png`}
            width={50}
            height={50}
            className="object-contain w-full h-full"
            alt="close1"
          />
        </button>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 space-y-3 flex-col hidden lg:flex">
          <button className="w-[48px] h-[48px]">
            <Image
              src={`/assets/images/popup/row.png`}
              width={48}
              height={48}
              className="object-contain w-full h-full"
              alt="row"
            />
          </button>
          <button className="w-[48px] h-[48px]">
            <Image
              src={`/assets/images/popup/row.png`}
              width={48}
              height={48}
              className="object-contain w-full h-full rotate-180"
              alt="row"
            />
          </button>
        </div>
        <div className="container mx-auto relative lg:max-w-[450px]">
          <div className="flex items-center justify-between px-4 absolute top-20 w-full lg:h-[100px] lg:bg-[#4B4B4B] rounded-tl-[20px] rounded-tr-[20px]">
            <button className="">
              <Image
                src={`/assets/images/popup/play-03.png`}
                width={36}
                height={36}
                className="object-contain "
                alt="play-03"
              />
            </button>
            <button className="">
              <Image
                src={`/assets/images/popup/volume-05.png`}
                width={48}
                height={48}
                className="object-contain "
                alt="volume-05"
              />
            </button>
          </div>
          {/* 450 x567 */}
          <div className="w-full h-[100vh] lg:w-[450px] lg:h-[60vh] object-cover mx-auto max-h-full">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            />
          </div>
          {/* <iframe
            width="450px"
            height="1000px"
            src="https://www.youtube.com/embed/khplMpm4ctc?si=gd9p8HhfWD2z21Sz"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-[100vh] lg:w-[450px] lg:h-[60vh] object-cover mx-auto max-h-full"
          ></iframe> */}
          <div className="absolute bottom-4 left-0 right-0 px-4 lg:static flex flex-col lg:h-[200px] pt-6 w-[85%] lg:w-full lg:bg-[#4B4B4B] rounded-bl-[20px] rounded-br-[20px]">
            <div className="text-xs ">Short Video - 16/08/2024 10:31</div>
            <div className={`${poppins.className} mt-4 uppercase`}>
              Lữ đoàn 161, Vùng 3 Hải quân: Nuôi quân giỏi, sẵn sàng chiến đấu
              cao
            </div>
          </div>
          <div className="absolute bottom-4 right-4 lg:-right-16 space-y-3 flex flex-col">
            <button className="w-[40px] h-[40px]">
              <Image
                src={`/assets/images/popup/Facebook.png`}
                width={50}
                height={50}
                className="object-contain w-full h-full"
                alt="close1"
              />
            </button>
            <button className="w-[40px] h-[40px]">
              <Image
                src={`/assets/images/popup/Twitter.png`}
                width={50}
                height={50}
                className="object-contain w-full h-full"
                alt="close1"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
