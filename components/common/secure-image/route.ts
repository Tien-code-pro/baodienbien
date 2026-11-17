// export const dynamic = "force-dynamic";
// // app/api/custom-loader.ts
// import { imageSignHelper } from "@/security/sign-helper";
// import Security from "@/security/url-handler";
// import { logInfo } from "@/utils/log-helper";
// import axios, { AxiosError } from "axios";
// import moment from "moment";
// import { NextResponse, userAgent } from "next/server";
// import sharp from "sharp";
// import NodeCache from "node-cache";
// const imageCache = new NodeCache();
// export async function GET(request: Request) {
//   try {
//     // 👇 get the image src,width, andq quality from query params
//     const { searchParams } = new URL(request.url);
//     let url = searchParams.get("url");
//     if (!url) {
//       return NextResponse.json("400 Bad request. url is missing", {
//         status: 400,
//       });
//     }
//     const current_time = moment().utc().unix();
//     const UIR = request.headers.get("Upgrade-Insecure-Requests");
//     const fetchMode = request.headers.get("Sec-Fetch-Mode");
//     const agent = userAgent(request);
//     if (agent.isBot) {
//       return NextResponse.json("400 Hello Bot, you cannot access.", {
//         status: 400,
//       });
//     }

//     if (UIR || fetchMode == "navigate") {
//       return NextResponse.json("400 You cannot access this image.", {
//         status: 400,
//       });
//     }
//     const sign = searchParams.get("sign") ?? "";
//     const time = searchParams.get("time") ?? "";
//     const publicTime = searchParams.get("publicTime") ?? "";

//     const re_sign = imageSignHelper({
//       time: parseInt(time),
//       makerCode: process.env.MAKER_CODE ?? "",
//       publicTime: parseInt(publicTime),
//     });
//     if (sign !== re_sign) {
//       return NextResponse.json("401 Image has invalid sign.", { status: 401 });
//     }
//     if (parseInt(publicTime) > current_time) {
//       return NextResponse.json(
//         "401 Event is not start, please comeback later.",
//         { status: 401 }
//       );
//     }
//     const width = searchParams.get("w") ?? "384";
//     const quality = searchParams.get("q") ?? "75";

//     // 👇 get the image data using axios
//     url = new Security().decrypt(url);
//     const headers = new Headers();
//     // 👇set content type to webp.
//     headers.set("content-type", "image/webp");
//     const imageCacheData = imageCache.get(url);
//     if (imageCacheData) {
//       logInfo("HIT", { image: url });
//       // 👇 use sharp to resize the image based on the parameters
//       const optimizedImageCache = await sharp(imageCacheData)
//         .resize({
//           withoutEnlargement: true,
//           width: parseInt(width),
//         })
//         .webp({ quality: parseInt(quality) }) //transform to webp format
//         .toBuffer();
//       return new NextResponse(optimizedImageCache, {
//         status: 200,
//         statusText: "OK",
//         headers,
//       });
//     }
//     const response = await axios.get(url, {
//       responseType: "arraybuffer",
//     });
//     imageCache.set(url, response.data, 86400);
//     // 👇 use sharp to resize the image based on the parameters
//     const optimized = await sharp(response.data)
//       .resize({
//         withoutEnlargement: true,
//         width: parseInt(width),
//       })
//       .webp({ quality: parseInt(quality) }) //transform to webp format
//       .toBuffer();

//     // 👇send buffered image
//     return new NextResponse(optimized, {
//       status: 200,
//       statusText: "OK",
//       headers,
//     });
//   } catch (e) {
//     if (e instanceof AxiosError) {
//       return NextResponse.json("", { status: 500 });
//     }
//   }
// }
