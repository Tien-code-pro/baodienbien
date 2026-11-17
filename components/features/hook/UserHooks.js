import { useEffect, useState } from "react";

const getLogedinUser = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authClient");
    const nameUser = localStorage.getItem("userName");
    return { token, nameUser };
  }
  return null;
};

const useProfile = () => {
  const userProfileSession = getLogedinUser()?.token;
  const nameUser = getLogedinUser()?.nameUser;
  var tokenLogin = userProfileSession && userProfileSession;
  var userNameLogin = nameUser && nameUser;

  return { tokenLogin, userNameLogin };
};

export { useProfile };
