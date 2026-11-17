import {
  logInFaceBook,
  logInGoogle,
} from "@/services/client-side/auth/auth.api";
import { getSocialClientID } from "@/services/client-side/social/social-service";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as React from "react";
import { setToken } from "@/services/client-side/axios.config";
import { useAppDispatch } from "@/redux/hooks";
import appSlice from "@/app/appSlice";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import FacebookLogin from "@greatsumini/react-facebook-login";

export interface ILoginSocialProps {
  typeLogin: "facebook" | "google" | "google-mall";
}

export default function LoginSocial(props: ILoginSocialProps) {
  const { typeLogin } = props;
  const dispatch = useAppDispatch();
  const { updateModalState, setLogin, setAccountName, setTokenRedux } =
    appSlice.actions;

  return (
    <>
      {typeLogin === "facebook" ? (
        <FacebookLogin
          className="login-fb"
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 3,
            opacity: 0,
          }}
          appId={getSocialClientID().clientIdFb}
          onSuccess={(response: any) => {
            logInFaceBook(response.accessToken).then((r) => {
              if (r.data && r.data.status > 0) {
                setToken(r.data.data.token);
                dispatch(setLogin());
                dispatch(setAccountName(r.data.data.full_name));
                dispatch(setTokenRedux(r.data.data.token));
                dispatch(updateModalState(null));
                // openNotification("bottomRight", "Đăng nhập thành công");
                localStorage.setItem("userName", r.data.data.full_name);
                localStorage.setItem("authClient", r.data.data);
                setTimeout(() => {
                  window.location.reload();
                }, 400);
              } else {
                // openNotificationFail("bottomRight", r.data.message);
              }
            });
          }}
          onFail={(error: any) => {
            console.log("response:", error);
            if (error) {
              //   openNotificationFail("bottomRight", "Đăng nhập thất bại");
            }
          }}
          onProfileSuccess={(response) => {
            localStorage.setItem("userName", JSON.stringify(response.name));
          }}
        ></FacebookLogin>
      ) : (
        <GoogleOAuthProvider clientId={getSocialClientID().clientIdGoogle}>
          <GoogleLogin
            size={typeLogin === "google-mall" ? "medium" : "large"}
            width={typeLogin === "google-mall" ? "20px" : "800px"}
            text="signin"
            itp_support={false}
            use_fedcm_for_prompt={false}
            onSuccess={(credentialResponse) => {
              console.log("data google:", credentialResponse.credential);
              if (credentialResponse.credential) {
                logInGoogle(credentialResponse.credential).then((r) => {
                  if (r.data && r.data.status > 0) {
                    localStorage.setItem("userName", r.data.data.full_name);
                    setToken(r.data.data.token);
                    dispatch(setLogin());
                    dispatch(setAccountName(r.data.data.full_name));
                    dispatch(setTokenRedux(r.data.data.token));
                    dispatch(updateModalState(null));
                    localStorage.setItem("authClient", r.data.data.token);
                    setTimeout(() => {
                      window.location.reload();
                    }, 400);
                  }
                });
              }
            }}
            onError={() => {
              //   openNotificationFail("bottomRight", "Đăng nhập thất bại");
            }}
          ></GoogleLogin>
        </GoogleOAuthProvider>
      )}
    </>
  );
}
