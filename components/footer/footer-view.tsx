"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBannerFooter } from "@/services/client-side/services-api/service-api-tien";
import { FooterType } from "@/types/articleNews";
import { decode } from "html-entities";
export default function FooterView() {
  const pathName = usePathname();

  const [imgFooter, setImgFooter] = useState<FooterType>();

  useEffect(() => {
    getBannerFooter().then((res) => {
      if (res.data.data && res.data.status > 0) {
        setImgFooter(res.data.data);
      }
    });
  }, []);

  if (pathName.includes("/vertify-new-password")) {
    return <></>;
  }

  const removeInlineStyles = (html: string) => {
    return html.replace(/(\n+)/g, "<br/>");
  };

  return (
    <>
      {!pathName.includes("doc-bao") && (
        <footer className="bg-[#B40C0E] px-4 2xl:px-0 py-5 lg:py-[30px]">
          <div className="container m-auto xl:max-w-[1200px]">
            <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
              <Link href={"/"} className="">
                <Image
                  width={300}
                  height={60}
                  src={`${
                    imgFooter?.logo_url
                      ? imgFooter?.logo_url
                      : "/assets/images/logo2.png"
                  }`}
                  alt="Logo Footer"
                  className="w-auto h-[90px] object-contain"
                />
              </Link>
              <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-end w-full mt-5 space-y-5 lg:space-y-0">
                <div
                  dangerouslySetInnerHTML={{
                    __html: removeInlineStyles(
                      decode(imgFooter?.copyright_info)
                    ),
                  }}
                  className={`text-center lg:text-left lg:w-1/2 text-sm`}
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decode(imgFooter?.contact_info),
                  }}
                  className={`text-center lg:text-right lg:w-1/2`}
                ></div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
