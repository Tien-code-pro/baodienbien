"use client";
import localFont from "next/font/local";
const mulish = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Mulish-Medium.ttf",

      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Mulish-SemiBold.ttf",

      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Mulish-Bold.ttf",

      weight: "700",
      style: "normal",
    },
  ],
});
const poppins = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins-Medium.ttf",

      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins-SemiBold.ttf",

      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins-Bold.ttf",

      weight: "700",
      style: "normal",
    },
  ],
});
const barlow = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Barlow-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Barlow-Medium.ttf",

      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Barlow-SemiBold.ttf",

      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Barlow-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Barlow-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});
export default function useFont() {
  return {
    mulish,
    poppins,
    barlow,
  };
}
