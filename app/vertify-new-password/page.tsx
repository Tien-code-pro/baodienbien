import { Suspense } from "react";
import dynamic from "next/dynamic";
const VerifyNewPasswordView = dynamic(() => import("./page-view"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const VerifyNewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyNewPasswordView />
    </Suspense>
  );
};
export default VerifyNewPassword;
