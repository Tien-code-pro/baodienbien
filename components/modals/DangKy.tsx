"use client";
import React, { useState } from "react";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import useFont from "@/components/hooks/useFont";
import Image from "next/image";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import {
  logIn,
  logInFaceBook,
  logInGoogle,
  register,
} from "@/services/client-side/auth/auth.api";
import FacebookLogin from "@greatsumini/react-facebook-login";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import crypto from "crypto";
import { setToken } from "@/services/client-side/axios.config";
import { getSocialClientID } from "@/services/client-side/social/social-service";
import LoginSocial from "./GoogleLogin";
interface ErrMess {
  isFirstName: string;
  isLastName: string;
  isEmail: string;
  isPassword: string;
  isPasswordConfirm: string;
  respon: string;
  messRespon: string;
}
const regexEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export default function DangKy() {
  const dispatch = useAppDispatch();
  const { updateModalState, setLogin, setAccountName, setTokenRedux } =
    appSlice.actions;
  const [isFirstName, setFirstName] = useState("");
  const [isLastName, setLastName] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isPasswordConfirm, setPasswordConfirm] = useState("");
  const [errMessage, setErrMessage] = useState<ErrMess>({
    isFirstName: "",
    isLastName: "",
    isEmail: "",
    isPassword: "",
    isPasswordConfirm: "",
    respon: "",
    messRespon: "",
  });
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, mess: string) => {
    api.success({
      message: mess,
      placement,
      duration: 1.8,
    });
  };
  const openNotificationFail = (
    placement: NotificationPlacement,
    mess: string,
  ) => {
    api.error({
      message: mess,
      placement,
      duration: 1.8,
    });
  };
  const handleLogin = () => {
    if (
      !errMessage.isEmail &&
      !errMessage.isFirstName &&
      !errMessage.isLastName &&
      !errMessage.isPassword &&
      !errMessage.isPasswordConfirm &&
      isEmail &&
      isFirstName &&
      isLastName &&
      isPassword &&
      isPasswordConfirm &&
      isPassword === isPasswordConfirm &&
      regexEmail.test(isEmail)
    ) {
      register(isFirstName + isLastName, isEmail, isPassword).then((res) => {
        if (res && res.data && res.data.status > 0) {
          setErrMessage({ ...errMessage, respon: "1" });
          const hashedPassword = crypto
            .createHash("md5")
            .update(isPassword)
            .digest("hex");
          logIn(isEmail, hashedPassword).then((res) => {
            if (res && res.data && res.data.status > 0) {
              setToken(res.data.data.token);
              dispatch(setLogin());
              dispatch(setAccountName(res.data.data.full_name));
              dispatch(setTokenRedux(res.data.data.token));
              // setTimeout(() => {
              //   window.location.reload();
              // }, 400);
            } else {
              setErrMessage({
                ...errMessage,
                respon: "Tài khoản hoặc mật khẩu không chính xác",
              });
              openNotificationFail("bottomRight", res.data.message);
            }
          });
        } else {
          setErrMessage({
            ...errMessage,
            messRespon: res.data.message,
            respon: "-1",
          });
        }
      });
    } else {
      let errMessageCopy: ErrMess = { ...errMessage };
      if (!isEmail) {
        errMessageCopy = {
          ...errMessageCopy,
          isEmail: "Không được bỏ trống",
        };
      } else {
        if (!regexEmail.test(isEmail)) {
          errMessageCopy = {
            ...errMessageCopy,
            isEmail: "Email không đúng định dạng",
          };
        }
      }
      if (!isFirstName) {
        errMessageCopy = {
          ...errMessageCopy,
          isFirstName: "Không được bỏ trống",
        };
      }
      if (!isLastName) {
        errMessageCopy = {
          ...errMessageCopy,
          isLastName: "Không được bỏ trống",
        };
      }
      if (!isPassword) {
        errMessageCopy = {
          ...errMessageCopy,
          isPassword: "Không được bỏ trống",
        };
      }
      if (!isPasswordConfirm) {
        errMessageCopy = {
          ...errMessageCopy,
          isPasswordConfirm: "Không được bỏ trống",
        };
      } else {
        if (isPassword !== isPasswordConfirm) {
          errMessageCopy = {
            ...errMessageCopy,
            isPasswordConfirm: "Mật khẩu không trùng khớp",
          };
        }
      }
      setErrMessage(errMessageCopy);
    }
  };

  return (
    <>
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
              Đăng ký
            </div>
            <div className="text-[30px] text-black font-bold lg:w-1/2 text-center hidden lg:block">
              Tạo tài khoản với
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
                      isEmail: "Không được bỏ trống",
                    });
                  } else {
                    setEmail(e.target.value);
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      isEmail: "",
                    });
                  }
                }}
                type="text"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errMessage.isEmail
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] `}
                placeholder="Nhập email"
              />
              <p className="text-red-500 italic mb-5 text-[14px] mt-1">
                {errMessage.isEmail}
              </p>
              <div className="flex flex-col lg:flex-row lg:space-x-4 mb-5">
                <div>
                  <input
                    onChange={(e) => {
                      if (!e.target.value) {
                        setErrMessage({
                          ...errMessage,
                          respon: "",
                          isFirstName: "Không được bỏ trống",
                        });
                      } else {
                        setFirstName(e.target.value);
                        setErrMessage({
                          ...errMessage,
                          respon: "",
                          isFirstName: "",
                        });
                      }
                    }}
                    type="text"
                    className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                      errMessage.isFirstName
                        ? "[border:1px_solid_#F44336]"
                        : "[border:1px_solid_#D8D8D8]"
                    }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] `}
                    placeholder="Tên"
                  />
                  <p className="text-red-500 italic text-[14px] mt-1">
                    {errMessage.isFirstName}
                  </p>
                </div>
                <p>Hoặc đăng nhập bằng</p>
                <div>
                  <input
                    onChange={(e) => {
                      if (!e.target.value) {
                        setErrMessage({
                          ...errMessage,
                          respon: "",
                          isLastName: "Không được bỏ trống",
                        });
                      } else {
                        setLastName(e.target.value);
                        setErrMessage({
                          ...errMessage,
                          respon: "",
                          isLastName: "",
                        });
                      }
                    }}
                    type="text"
                    className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                      errMessage.isLastName
                        ? "[border:1px_solid_#F44336]"
                        : "[border:1px_solid_#D8D8D8]"
                    }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] `}
                    placeholder="Họ"
                  />
                  <p className="text-red-500 italic text-[14px] mt-1">
                    {errMessage.isLastName}
                  </p>
                </div>
              </div>

              <input
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      isPassword: "Không được bỏ trống",
                    });
                  } else {
                    setErrMessage({
                      ...errMessage,
                      isPassword: "",
                      respon: "",
                    });
                    setPassword(e.target.value);
                  }
                }}
                type="password"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errMessage.isPassword
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] `}
                placeholder="Nhập mật khẩu"
              />
              <p className="text-red-500 italic mb-5 text-[14px] mt-1">
                {errMessage.isPassword}
              </p>
              <input
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrMessage({
                      ...errMessage,
                      respon: "",
                      isPasswordConfirm: "Không được bỏ trống",
                    });
                  } else {
                    setErrMessage({
                      ...errMessage,
                      isPasswordConfirm: "",
                      respon: "",
                    });
                    setPasswordConfirm(e.target.value);
                  }
                }}
                type="password"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errMessage.isPasswordConfirm
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                }  pl-4 lg:pl-7 lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px]`}
                placeholder="Xác nhận mật khẩu"
              />
              <p className="text-red-500 italic mb-5 text-[14px] mt-1">
                {errMessage.isPasswordConfirm}
              </p>
              {errMessage.respon &&
                (errMessage.respon === "1" ? (
                  <p className="text-green-500 italic  text-[16px] mt-1 text-center  mb-1">
                    Đăng ký tài khoản thành công
                  </p>
                ) : (
                  <p className="text-red-500 italic  text-[16px] mt-1 text-center mb-1">
                    {errMessage.messRespon}
                  </p>
                ))}
              {/* {errMessage.respon}
              </p> */}

              <button
                disabled={errMessage.respon === "1"}
                onClick={handleLogin}
                className={`w-full hover:bg-red-600 ${
                  errMessage.respon !== "1"
                    ? "bg-[#b40c0e]"
                    : "bg-[#6c757d] opacity-[50%]"
                }  rounded-lg h-[50px] lg:h-[64px] outline-none flex items-center justify-center`}
              >
                Tạo tài khoản
              </button>
            </div>
            <div className="flex-col px-12 hidden lg:flex space-y-4 w-1/2">
              <button className="flex items-center justify-center outline-none [border:1px_solid_#1F6FB5] text-[18px] font-bold text-[#1F6FB5] relative w-full h-[64px] rounded-lg">
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
              <div className="relative">
                <div className="w-[100%] absolute h-[50px] z-[3] opacity-0 top-[10px]">
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
          <div className="mt-4 lg:mt-9 text-[#979797] text-sm lg:text-base text-center px-8 lg:px-0">
            Khi bấm tạo tài khoản bạn đã đồng ý với{" "}
            <strong className="font-normal text-[#007DC4]">quy định</strong> của
            tòa soạn
          </div>
        </div>
      </div>
    </>
  );
}
