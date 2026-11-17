"use client";
import { useEffect, useState } from "react";
import {
  getNewPassword,
  passwordVertify,
} from "@/services/client-side/auth/auth.api";
import { Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyNewPasswordView() {
  const searchParams = useSearchParams();

  const search = searchParams.get("exp");
  const searchEmail = searchParams.get("email");
  // const { exp, email } = router.query;
  const [mess, setMess] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("dhasd12^%^&^*");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("dhasd12^%^&^*");
  const [saveSuccess, setSaveSuccess] = useState(false);
  useEffect(() => {
    if (search) {
      passwordVertify(searchEmail, search).then((r) => {
        if (r.data && r.data.status > 0) {
          setIsSuccess(true);
          setMess(r.data.message);
        } else {
          setIsSuccess(false);
          setMess(r.data.message);
        }
      });
    }
  }, []);
  const savePassword = () => {
    if (newPassword === "dhasd12^%^&^*") {
      setNewPassword("");
      return;
    }
    if (newPasswordConfirm === "dhasd12^%^&^*") {
      setNewPasswordConfirm("");
      return;
    }
    if (
      newPassword &&
      newPasswordConfirm &&
      newPassword === newPasswordConfirm
    ) {
      getNewPassword(searchEmail, Number(search), newPasswordConfirm).then(
        (res) => {
          setSaveSuccess(true);
          setMess(res.data.message);
        }
      );
    }
  };
  return (
    <>
      {isSuccess ? (
        <>
          {saveSuccess ? (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                fontSize: 24,
                height: 600,
                flexDirection: "column",
              }}
            >
              <p className="text-[#000]">{mess} </p> <br />
              <p className="text-[#000]">
                Bấm
                <a
                  href={"https://dienbien.vtcplay.vn/"}
                  style={{
                    color: "#3577F1",
                    verticalAlign: "text-bottom",
                    marginTop: "-200px",
                  }}
                >
                  vào đây
                </a>
                để quay lại trang chủ
              </p>
            </div>
          ) : (
            <form style={{ width: "350px", margin: "0 auto 0 auto" }}>
              <div
                style={{
                  justifyContent: "center",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 24,
                  flexDirection: "column",
                }}
              >
                <p>{"Xác nhận thông tin thành công"} </p> <br />
              </div>
              <label className="text-[#000]">
                Mật khẩu mới
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Bạn chưa nhập mật khẩu" },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    style={{ height: "38px" }}
                    placeholder={"Nhập mật khẩu"}
                  />
                </Form.Item>
                <p
                  style={{
                    color: "red",
                    height: "10px",
                    marginTop: "-20px",
                    marginBottom: "20px",
                  }}
                >
                  {!newPassword && "Không được bỏ trống"}
                </p>
              </label>
              <label className="text-[#000]">
                Nhập lại mật khẩu
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Bạn chưa nhập mật khẩu" },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => {
                      setNewPasswordConfirm(e.target.value);
                    }}
                    style={{ height: "38px" }}
                    placeholder={"Nhập mật khẩu"}
                  />
                </Form.Item>
                {newPassword &&
                  newPassword !== "dhasd12^%^&^*" &&
                  newPassword !== newPasswordConfirm && (
                    <p style={{ color: "red", marginTop: "-20px" }}>
                      Mật khẩu không khớp
                    </p>
                  )}
                {
                  <p style={{ color: "red", marginTop: "-20px" }}>
                    {!newPassword && "Không được bỏ trống"}
                  </p>
                }
              </label>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="button-login"
                  type="primary"
                  style={{ width: "50%", marginTop: "20px" }}
                  onClick={savePassword}
                  disabled={newPassword !== newPasswordConfirm || !newPassword}
                >
                  Lưu
                </Button>
              </div>
            </form>
          )}
        </>
      ) : (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            height: 600,
            flexDirection: "column",
          }}
        >
          <p className="text-[#000]">{mess} </p> <br />
          <p className="text-[#000]">
            Bấm{" "}
            <Link
              href={"/"}
              style={{
                color: "#3577F1",
                verticalAlign: "text-bottom",
                marginTop: "-200px",
              }}
            >
              vào đây
            </Link>{" "}
            để quay lại trang chủ{" "}
          </p>
        </div>
      )}
    </>
  );
}
