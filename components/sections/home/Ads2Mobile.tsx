"use client";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { PlatformAdvertisementType } from "./TamDiemDaPhuongTien";
import { getADSApi } from "@/services/client-side/services-api/service1";
import Link from "next/link";
import { AdvertisementType } from "@/types/category";

export default function Ads2Mobile() {
  const [ads2, setAds2] = useState<AdvertisementType[]>();
  // useEffect(() => {
  //   getADSApi({
  //     device_type: "mobile",
  //     display_position: 2,
  //     page_type: 1, // Trang chủ
  //     limit: 10,
  //   }).then((res) => {
  //     setAds2(res.data.data.list);
  //   });
  // }, []);
  return (
    <>
      {/* {ads2 &&
        ads2.length > 0 &&
        ads2.map((ads2, index) => (
          <Link key={index} target="_blank" href={ads2.url || ""}>
            <h1>this is tam diem mobile</h1>
            <Image
              src={ads2.image_url || ""}
              width={1920}
              height={1080}
              className="object-cover w-full h-auto mt-1 lg:mt-10 lg:hidden"
              alt="Banner2"
            />
          </Link>
        ))} */}
    </>
  );
}
