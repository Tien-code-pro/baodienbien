"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useFont from "@/components/hooks/useFont";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import { IUserAccount } from "@/types/apiTypes";
import { getAccountInfor } from "@/services/client-side/services-api/serviceAnhht-api";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
const ThongTinChung = () => {
  const { barlow } = useFont();
  const [accountInfo, setAccountInfo] = useState<IUserAccount | null>(null);
  const { isLogin } =
    useAppSelector((state: RootState) => state.app);
  useEffect(() => {
    if (isLogin) {
      getAccountInfor({}).then((res) => {
        if (res && res.status > 0) {
          setAccountInfo(res.data.data);
        }
      });
    }
  }, []);
  if (!accountInfo) {
    return;
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <div
          className={`font-bold text-2xl lg:text-[30px] ${barlow.className} text-[#212529] uppercase`}
        >
          Liên hệ tòa soạn
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
            Ảnh đại diện
          </div>
          <div className="flex items-center justify-between">
            <Image
              src={`/assets/images/tttk/avata.jpg`}
              width={60}
              height={60}
              className="object-contain"
              alt="avata"
            />
            <button
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay ảnh đại diện
            </button>
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Họ tên
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline `}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Thông tin đang được xét duyệt
          </div>
          <div
            className={`${barlow.className} text-[18px] text-[#838383] mt-3`}
          >
            {accountInfo.full_name}
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Email
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            {accountInfo.user_name}
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Mật khẩu
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            *********************
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Kết nối tài khoản
            </div>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Kết nối tài khoản VnExpress của bạn với Google, Facebook hoặc Apple
            để đăng nhập bằng những tài khoản này.
          </div>
          <div className="mt-14 flex flex-col  space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={`/assets/images/tttk/socials1.png`}
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                  alt="Facebook"
                />
                <div className={`text-[18px] ${barlow.className} text-black`}>
                  Facebook
                </div>
              </div>
              <div
                className={`text-[18px] ${barlow.className} text-[#686868] underline`}
              >
                Ngắt kết nối
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={`/assets/images/tttk/socials.png`}
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                  alt="google"
                />
                <div className={`text-[18px] ${barlow.className} text-black`}>
                  Google
                </div>
              </div>
              <div
                className={`text-[18px] ${barlow.className} text-[#686868] underline`}
              >
                Ngắt kết nối
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-20">
        <div
          className={`font-bold text-2xl lg:text-[30px] ${barlow.className} text-[#212529] uppercase`}
        >
          Thông tin cá nhân
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Ngày sinh
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Chưa có thông tin
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Giới tính
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Không chia sẻ
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Số điện thoại cá nhân
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Chưa có thông tin
          </div>
        </div>
        <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className={`text-[#212529] ${barlow.className} text-2xl mb-3`}>
              Địa chỉ
            </div>
            <button
              disabled={true}
              className={`${barlow.className} text-[18px] text-[#686868] underline`}
            >
              Thay đổi
            </button>
          </div>
          <div className={`${barlow.className} text-[18px] text-[#838383]`}>
            Chưa có thông tin
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongTinChung;
