"use client";
import React, { useState } from "react";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import DangKy from "./DangKy";
import FacebookLogin from "@greatsumini/react-facebook-login";
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import {
  logIn,
  logInFaceBook,
  logInGoogle,
} from "@/services/client-side/auth/auth.api";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import VerifyEmail from "./VerifyEmail";
import crypto from "crypto";
import { removeToken, setToken } from "@/services/client-side/axios.config";
import { getSocialClientID } from "@/services/client-side/social/social-service";
import LoginGoogle from "./GoogleLogin";
import LoginSocial from "./GoogleLogin";

export interface ErrMess {
  user_name: string;
  password: string;
  respon: string;
}
export default function DangNhap() {
  const [api, contextHolder] = notification.useNotification();
  const [nameAccount, setNameAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState<ErrMess>({
    user_name: "",
    password: "",
    respon: "",
  });
  const dispatch = useAppDispatch();
  const { updateModalState, setLogin, setAccountName, setTokenRedux } =
    appSlice.actions;

  const openNotification = (placement: NotificationPlacement, mess: string) => {
    api.success({
      message: mess,
      placement,
      duration: 1.8,
    });
  };
  const openNotificationFail = (
    placement: NotificationPlacement,
    mess: string
  ) => {
    api.error({
      message: mess,
      placement,
      duration: 1.8,
    });
  };

  const handleLogin = () => {
    removeToken();
    if (nameAccount && password) {
      const hashedPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      logIn(nameAccount, hashedPassword).then((res) => {
        if (res && res.data && res.data.status > 0) {
          setToken(res.data.data.token);
          dispatch(setLogin());
          dispatch(setAccountName(res.data.data.full_name));
          dispatch(setTokenRedux(res.data.data.token));
          dispatch(updateModalState(null));
          openNotification("bottomRight", "Đăng nhập thành công");
          window.location.reload();
        } else {
          setErrMessage({
            ...errMessage,
            respon: "Tài khoản hoặc mật khẩu không chính xác",
          });
          openNotificationFail("bottomRight", res.data.message);
        }
      });
    } else {
      let errMessageCopy: ErrMess = { ...errMessage };
      if (!nameAccount) {
        errMessageCopy = {
          ...errMessageCopy,
          user_name: "Không được bỏ trống",
        };
      }
      if (!password) {
        errMessageCopy = {
          ...errMessageCopy,
          password: "Không được bỏ trống",
        };
      }
      setErrMessage(errMessageCopy);
    }
  };
  return (
    <>
      {/* //modal đăng nhập */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[99999] px-4 2xl:px-0 flex items-center justify-center bg-[rgba(0,_0,_0,_.7)]">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative bg-white pb-10 pt-5 lg:pt-9 max-w-[1040px] w-full lg:px-5 lg:scale-75 xl:scale-100"
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
          <div className="flex items-center justify-between px-4 2xl:px-0">
            <div className="text-[22px] lg:text-[30px] text-[#343a40] lg:text-[#ED1C24] font-bold lg:w-1/2 text-center">
              Đăng nhập
            </div>
            <div className="text-[30px] text-black font-bold lg:w-1/2 text-center hidden lg:block">
              Đăng nhập với
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
          <div className="flex w-full">
            <div className="flex flex-col px-8 lg:px-12  w-full lg:w-1/2 lg:[border-right:1px_solid_#D9D9D9]">
              <input
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      user_name: "Không được bỏ trống",
                    });
                  } else {
                    setNameAccount(e.target.value);
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      user_name: "",
                    });
                  }
                }}
                type="text"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errMessage.user_name
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px]`}
                placeholder="Nhập email"
              />
              <p className="text-red-500 italic mb-5 text-[14px] mt-1">
                {errMessage.user_name}
              </p>

              <input
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      password: "Không được bỏ trống",
                    });
                  } else {
                    setErrMessage({
                      ...errMessage,
                      password: "",
                      respon: "",
                    });
                    setPassword(e.target.value);
                  }
                }}
                type="password"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errMessage.password
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px]`}
                placeholder="Nhập mật khẩu"
              />
              <p className="text-red-500 italic mb-5 text-[14px] mt-1">
                {errMessage.password}
              </p>
              <p className="text-red-500 italic text-[16px] mt-1 text-center mb-2">
                {errMessage.respon}
              </p>
              <button
                onClick={handleLogin}
                className="w-full hover:bg-red-600 bg-[#b40c0e] rounded-lg h-[50px] lg:h-[64px] outline-none flex items-center justify-center"
              >
                Đăng nhập
              </button>
              {/* <p className=" text-center mt-5 ">
                Hoặc đăng nhập bằng
              </p> */}
              <div className="flex items-center my-4 mt-8   lg:hidden">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-[#979797] text-[14px]">
                  Hoặc đăng nhập bằng
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex items-center justify-center space-x-4   lg:hidden">
                <div className="relative">
                  <div className="w-[100%] absolute h-[100%] z-[3] opacity-0 ">
                    <LoginSocial typeLogin="facebook" />
                  </div>
                  <Image
                    src={"/assets/images/login/facebook_icon_login.webp"}
                    width={38}
                    height={38}
                    className="object-contain"
                    alt="facebook"
                  ></Image>
                </div>
                <div className="relative">
                  <div className="w-[100%] absolute h-[100%] z-[3] opacity-0 overflow-hidden">
                    <LoginSocial typeLogin="google-mall" />
                  </div>
                  <Image
                    src={"/assets/images/login/google_icon_login.webp"}
                    width={50}
                    height={50}
                    className="object-contain"
                    alt="google"
                  ></Image>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(updateModalState(<VerifyEmail />));
                }}
                className="text-[#979797] text-sm lg:text-base mt-5 text-left"
              >
                Lấy lại mật khẩu?
              </button>
            </div>
            <div className="flex-col px-12 hidden lg:flex space-y-4 w-1/2">
              <button className="flex items-center justify-center outline-none [border:1px_solid_#1F6FB5] text-[18px] font-bold text-[#1F6FB5] relative w-full h-[64px] rounded-lg z-[3]">
                <Image
                  src={`/assets/images/popup/socials.png`}
                  width={15}
                  height={28}
                  className="object-contain absolute left-8 top-1/2 -translate-y-1/2"
                  alt="socials"
                />
                Facebook
                <LoginSocial typeLogin="facebook" />
              </button>

              <div className="relative ">
                <div className="w-[100%] absolute h-[100%] z-[3] opacity-0 top-[10px] ">
                  <LoginSocial typeLogin="google" />
                </div>

                <button className="flex items-center justify-center outline-none [border:1px_solid_#1F6FB5] text-[18px] font-bold text-[#4285F4] relative w-full h-[64px] rounded-lg">
                  <Image
                    src={`/assets/images/popup/google.png`}
                    width={32}
                    height={33}
                    className="object-contain absolute left-5 top-1/2 -translate-y-1/2"
                    alt="google"
                  />
                  Google
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(updateModalState(<DangKy />));
            }}
            className="mt-4 lg:mt-9 text-[#979797] text-sm lg:text-base text-center px-8 lg:px-0 mx-auto flex items-center justify-center"
          >
            Bạn chưa có tài khoản?{"  "}
            <strong className="font-normal text-[#007DC4]">
              &nbsp;Đăng ký
            </strong>
          </button>
        </div>
      </div>
    </>
  );
}
