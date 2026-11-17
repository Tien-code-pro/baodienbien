"use client";
import React, { useEffect, useState } from "react";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import useFont from "@/components/hooks/useFont";
import Image from "next/image";
import { Button, Input } from "antd";
import DangKy from "./DangKy";
import { sendEmail } from "@/services/client-side/auth/auth.api";
const regexEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export default function LayLaiMatKhau() {
  const dispatch = useAppDispatch();
  const { updateModalState } = appSlice.actions;
  const [isEmail, setEmail] = useState("dju8u89r*&*&(HUhufhq");
  const [errValidEmail, setErrValidEmail] = useState("dju8u89r*&*&(HUhufhq");
  const [isSendEmail, setSendEmail] = useState(false);
  useEffect(() => {
    if (isEmail === "dju8u89r*&*&(HUhufhq") {
      return;
    }
    if (isEmail) {
      setErrValidEmail("");
      if (!regexEmail.test(isEmail)) {
        setErrValidEmail("Chưa đúng định dạng email");
      }
    } else {
      setErrValidEmail("Không được bỏ trống");
    }
  }, [isEmail]);
  const handleConfirm = () => {
    if (isEmail === "dju8u89r*&*&(HUhufhq") {
      setEmail("");
    }
    if (errValidEmail === "") {
      sendEmail(isEmail, 3).then((res) => {
        if (res.data.status > 0) {
          setSendEmail(true);
        } else {
          setErrValidEmail(res.data.message);
        }
      });
    }
  };
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
            {isSendEmail ? (
              <div style={{ fontSize: "18px", margin: "20px 0 30px 0" }}>
                <p style={{ textAlign: "center", color: "#57534E" }}>
                  Link xác thực đã được gửi tới email
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#3577F1",
                    margin: "5px 0",
                  }}
                >
                  {isEmail}
                </p>
                <p style={{ textAlign: "center", color: "#57534E" }}>
                  Vui lòng kiểm tra lại mật khẩu
                </p>
              </div>
            ) : (
              <>
                <p
                  style={
                    isSendEmail
                      ? {
                          marginTop: "20px",
                          marginBottom: "10px",
                          width: "100%",
                          textAlign: "center",
                          fontSize: "16px",
                          color: "#7B7B7B",
                        }
                      : {
                          marginTop: "20px",
                          marginBottom: "10px",
                          width: "100%",
                          textAlign: "center",
                          fontSize: "16px",
                          color: "#7B7B7B",
                        }
                  }
                >
                  Nhập email của bạn để lấy lại mật khẩu
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <input
                    onChange={(e) => {
                      setTimeout(() => {
                        setEmail(e.target.value.trim());
                      }, 500);
                    }}
                    className="w-full outline-none [border:1px_solid_#D8D8D8] text-center lg:text-[18px] text-[#979797] rounded-lg h-[50px] lg:h-[64px] mb-5"
                    placeholder="Nhập email"
                  />
                </div>
                <p
                  style={{
                    width: "80%",
                    margin: "-17px auto 17px auto",
                    color: "red",
                  }}
                >
                  {errValidEmail !== "dju8u89r*&*&(HUhufhq" && errValidEmail}
                </p>
              </>
            )}

            <button
              onClick={handleConfirm}
              className="w-full hover:bg-red-600 bg-[#b40c0e] rounded-lg h-[50px] lg:h-[64px] outline-none flex items-center justify-center"
            >
              Lấy lại mật khẩu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
