"use client";
import Image from "next/image";
import * as React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { usePathname } from "next/navigation";
import { env } from 'next-runtime-env'

export interface IShareFacebookProps {
  url: string;
}

export default function ShareFacebook() {
  const pathname = usePathname();
  const urlShare = env('NEXT_PUBLIC_DOMAIN') + pathname;

  return (
    <>
      <FacebookShareButton
        url={urlShare}
        windowHeight={2000}
        // quotes={quotes} //"Your Quotes"
        // hashtag={hashtag} // #hashTag
      >
        <Image
          width={160}
          height={33}
          alt="facebook"
          src={`/assets/images/tinchitiet/btn2.png`}
          className={`bg-contain`}
        />
        {/* <FacebookIcon /> */}
      </FacebookShareButton>
    </>
  );
}
