"use client";
import React from "react";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import useFont from "@/components/hooks/useFont";
import Image from "next/image";
import DangKy from "./DangKy";

export default function LayLaiMatKhau() {
  const dispatch = useAppDispatch();
  const { updateModalState } = appSlice.actions;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] px-4 2xl:px-0 flex items-center justify-center bg-[rgba(0,_0,_0,_.7)]">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative bg-white pb-20 pt-5 lg:pt-9 max-w-[1040px] w-full lg:px-5 lg:scale-75 xl:scale-100 px-4 2xl:px-0"
        >
          <button
            onClick={() => {
              dispatch(updateModalState(null));
            }}
            className="w-[70px] h-[70px] absolute -top-6 -right-6 hidden lg:flex"
          >
            <Image
              src={`/assets/images/popup/close.png`}
              width={70}
              height={70}
              className="object-contain w-full h-full"
              alt="close"
            />
          </button>
          <div className="flex items-center lg:justify-center justify-between">
            <div className="text-[22px] lg:text-[30px] text-black font-bold lg:w-1/2 text-center">
              Lấy lại mật khẩu
            </div>
            <button
              onClick={() => {
                dispatch(updateModalState(null));
              }}
              className="w-[36px] h-[36px] lg:hidden"
            >
              <Image
                src={`/assets/images/popup/close.png`}
                width={36}
                height={36}
                className="object-contain w-full h-full"
                alt="close"
              />
            </button>
          </div>
          <hr className="[border-top:1px_solid_#D9D9D9] w-full mb-8 lg:mb-[50px] mt-5" />
          <div className="flex flex-col mx-auto w-full lg:w-[620px]">
            <input
              type="password"
              className="w-full outline-none [border:1px_solid_#D8D8D8] text-center lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] mb-5"
              placeholder="Nhập mật khẩu"
            />
            <button className="w-full hover:bg-red-600 bg-[#b40c0e] rounded-lg h-[50px] lg:h-[64px] outline-none flex items-center justify-center">
              Lấy lại mật khẩu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
