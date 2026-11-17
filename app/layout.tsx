import HeaderMenu from "@/components/header/headerMenu";
import "./globals.scss";
import type { Metadata } from "next";

// import Footer from "@/components/footer/page";
import { Providers } from "@/redux/provider";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import localFont from "next/font/local";
import { getFaviconSSR } from "@/services/server-side/services-api/service1";
import dynamic from "next/dynamic";
import { PublicEnvScript } from "next-runtime-env";
const Footer = dynamic(() => import("@/components/footer/page"), {
  ssr: true,
  loading: () => <div>Loading...</div>,
});
import NextTopLoader from "nextjs-toploader";
const mulish = localFont({
  src: [
    {
      path: "../public/assets/fonts/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Mulish-Medium.ttf",

      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Mulish-SemiBold.ttf",

      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Mulish-Bold.ttf",

      weight: "700",
      style: "normal",
    },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const res_favicon = await getFaviconSSR();
  if (
    res_favicon.data &&
    res_favicon.data.status > 0 &&
    res_favicon.data.data
  ) {
    return {
      title: "Báo Điện Biên Phủ",
      description: "Báo Điện Biên Phủ",
      keywords: "Báo Điện Biên Phủ",
      authors: [
        {
          name: "VTC Digital",
          url: "https://www.facebook.com/profile.php?id=61559574034289",
        },
      ],
      robots: "noodp",
      icons: {
        icon: res_favicon.data.data.image_url || "",
      },
    };
  } else {
    return {
      title: "Báo điện biên",
      description: "Báo điện biên",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="rittivqMXsQikeqDfglTzcztZCrcfSd5v6n1d2jlPPs"
        />
        <PublicEnvScript />
      </head>
      <body
        id="body-tag"
        className={`${mulish.className} leading-snug text-white text-base pt-[136px] lg:pt-[228px]`}
      >
        <Providers>
          <div className="w-full min-h-[calc(100vh-208px)] flex flex-col">
            <NextTopLoader
              color="#D62127"
              height={3}
              showSpinner={true}
              speed={200}
              zIndex={1600}
            />
            <HeaderMenu />
            <div id="body-wrap" className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
      {/* Sử dụng Google Analyst */}
      <GoogleAnalytics gaId="G-W4VE3SS2KE" />
      {/* Sử dụng google tag manager */}
      <GoogleTagManager gtmId="G-W4VE3SS2KE" />
      <Script
        strategy="beforeInteractive"
        async
        src="https://sp.zalo.me/plugins/sdk.js"
      ></Script>
    </html>
  );
}
