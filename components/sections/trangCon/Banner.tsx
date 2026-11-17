import { poppins } from "@/components/hooks/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Banner = async ({
  type_slug
}: {
  type_slug?: string
}) => {
  return (
    <>
      <section className={`relative `}>
        <Image
          width={375}
          height={150}
          src={`/assets/images/trangcon/bannermb.jpg`}
          alt="trangtri"
          className={`object-cover w-full h-[150px] lg:hidden`}
        />

        <Image
          width={1920}
          height={250}
          src={`/assets/images/trangcon/daphuongtien2.png`}
          alt="trangtri"
          className={`object-cover w-full h-[250px] hidden lg:block`}
        />
        <div className="px-4 2xl:px-0 w-full absolute bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className={`uppercase ${poppins.className} text-[30px] leading-[1.2] lg:text-[50px] font-bold lg:mb-4`}>
              {
                type_slug ?
                  <>
                    {
                      type_slug === "video" && "Truyền hình"
                    }
                    {
                      type_slug === "emagazine" && "Emagazine"
                    }
                    {
                      type_slug === "audio" && "Podcast"
                    }
                    {
                      type_slug === "infographic" && "Infographic"
                    }
                  </>
                  :
                  "Đa phương tiện"
              }
            </div>
            <div className="flex justify-start lg:justify-center ctscroll overflow-auto mt-3 lg:mt-0 w-full ">
              {
                type_slug !== "video" &&
                <Link
                  href={`/da-phuong-tien/video`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon5.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(127deg)_brightness(108%)_contrast(101%)]"
                    alt="icon5"
                  />
                  <div
                    className={`text-white text-xs uppercase ${poppins.className}`}
                  >
                    Video
                  </div>
                </Link>
              }
              {
                type_slug !== "emagazine" &&
                <Link
                  href={`/da-phuong-tien/emagazine`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon10.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(127deg)_brightness(108%)_contrast(101%)]"
                    alt="icon11"
                  />
                  <div
                    className={`text-white text-xs uppercase ${poppins.className}`}
                  >
                    Emagazine
                  </div>
                </Link>
              }
              {
                type_slug !== "tin-anh" &&
                <Link
                  href={`/da-phuong-tien/tin-anh`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon11.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(127deg)_brightness(108%)_contrast(101%)]"
                    alt="icon11"
                  />
                  <div
                    className={`text-white text-xs uppercase ${poppins.className}`}
                  >
                    Ảnh
                  </div>
                </Link>
              }

              {
                type_slug !== "audio" &&
                <Link
                  href={`/da-phuong-tien/audio`}
                  className="flex items-center flex-shrink-0 mr-6"
                >
                  <Image
                    src={`/assets/images/home/icon12.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(127deg)_brightness(108%)_contrast(101%)]"
                    alt="icon13"
                  />
                  <div
                    className={`text-white text-xs uppercase ${poppins.className}`}
                  >
                    Podcast
                  </div>
                </Link>
              }
              {
                type_slug !== "infographic" &&
                <Link
                  href={`/da-phuong-tien/infographic`}
                  className="flex items-center flex-shrink-0"
                >
                  <Image
                    src={`/assets/images/home/icon13.png`}
                    width={20}
                    height={20}
                    className="object-contain mr-2 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(127deg)_brightness(108%)_contrast(101%)]"
                    alt="icon13"
                  />
                  <div
                    className={`text-white text-xs uppercase ${poppins.className}`}
                  >
                    infographic
                  </div>
                </Link>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Banner;
