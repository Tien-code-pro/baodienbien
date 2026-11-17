'use client'
import crypto from "crypto";
import moment from "moment";
import { env } from 'next-runtime-env'

export const imageSignHelper = ({
  time,
  makerCode,
  publicTime,
}: {
  time: number;
  makerCode: string;
  publicTime: number;
}) => {
  return crypto
    .createHash("sha256")
    .update(
      `${time}${makerCode}${publicTime}${
        env('NEXT_PUBLIC_BACKEND_KEYSIGN') || ""
      }`
    )
    .digest("hex");
};
export const basicSignHelper = () => {
  return crypto
    .createHash("sha256")
    .update(`${moment().utc().unix}vtcintecom}`)
    .digest("hex");
};
