"use client";
import { ImageProps } from "next/image";
import React from "react";
import Image from "next/image";
import moment from "moment";
import { imageSignHelper } from "@/security/sign-helper";
import { encryptClientSide } from "@/security/url-handler-client";
interface ImagePropsCustom extends ImageProps {
  publicTime: number;
}
import { env } from 'next-runtime-env'

const SecureImage = (props: ImagePropsCustom) => {
  const time = moment().utc().unix();
  const makerCode = env('NEXT_PUBLIC_MAKER_CODE') ?? "";
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src, width: w, quality }) => {
        const q = quality || 75;
        return `/api/secure-image?url=${encryptClientSide(src)}&publicTime=${props.publicTime
          }&time=${time}&sign=${imageSignHelper({
            time,
            makerCode,
            publicTime: props.publicTime,
          })}&w=${w}&q=${q}`;
      }}
    />
  );
};
export default SecureImage;
