import { poppins } from "@/components/hooks/font";
import ShortVideoMB from "@/components/sections/shortVideos/ShortVideoMB";
import VideoPlayer from "@/components/sections/shortVideos/VideoPlayer";
import { getDetailShortVideo } from "@/services/server-side/services-api/service-api";
import { ShortVideoType } from "@/types/articleNews";
import { param } from "jquery";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: { slug: string | undefined };
}) {
  const res = await getDetailShortVideo(params.slug || "");
  if (!(res && res?.data && res.data.data)) {
    redirect("/short-video");
  }
  const shorts = res && res?.data && res.data.data;

  // const shorts: ShortVideoType = {
  //   afterSlug: "main-character",
  //   articleId: 1,
  //   articleTitle: "Video demo sshort video",
  //   beforeSlug: "villain",
  //   currentSlug: "main-anime",
  //   articleSapo: "",
  //   avatarImage: "",
  //   fileUrl:
  //     "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  // };
  return (
    <>
      {" "}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[10] bg-[#767676] flex items-center justify-center lg:py-[100px]">
        <Link href={"/short-video"}>
          <button className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] absolute top-4 left-4">
            <Image
              src={`/assets/images/popup/close1.png`}
              width={50}
              height={50}
              className="object-contain w-full h-full"
              alt="close1"
            />
          </button>
        </Link>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 space-y-3 flex-col flex z-[20]">
          <Link href={shorts.before_slug || ""}>
            <button className="w-[48px] h-[48px]">
              <Image
                src={`/assets/images/popup/row.png`}
                width={48}
                height={48}
                className="object-contain w-full h-full"
                alt="row"
              />
            </button>
          </Link>
          <Link href={shorts.after_slug || ""}>
            <button className="w-[48px] h-[48px]">
              <Image
                src={`/assets/images/popup/row.png`}
                width={48}
                height={48}
                className="object-contain w-full h-full rotate-180"
                alt="row"
              />
            </button>
          </Link>
        </div>
        <div className="container mx-auto relative lg:max-w-[450px]">
          <VideoPlayer short={shorts} />
          {/* <ShortVideoMB /> */}
          {/* <iframe
      width="450px"
      height="1000px"
      src="https://www.youtube.com/embed/khplMpm4ctc?si=gd9p8HhfWD2z21Sz"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      className="w-full h-[100vh] lg:w-[450px] lg:h-[60vh] object-cover mx-auto max-h-full"
    ></iframe> */}
          <div className="absolute bottom-4 left-0 right-0 px-4 lg:bottom-0 flex flex-col lg:h-[200px] pt-6 w-[85%] lg:w-full lg:bg-transparent rounded-bl-[20px] rounded-br-[20px]">
            <div className="text-xs ">
              Short Video -{" "}
              {moment(shorts.publish_date).format("DD/MM/YYYY HH:mm")}
            </div>
            <div className={`${poppins.className} mt-4 uppercase`}>
              {shorts.article_title}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 lg:-right-16 space-y-3 flex flex-col">
            <button className="w-[40px] h-[40px]">
              <Image
                src={`/assets/images/popup/Facebook.png`}
                width={50}
                height={50}
                className="object-contain w-full h-full"
                alt="close1"
              />
            </button>
            <button className="w-[40px] h-[40px]">
              <Image
                src={`/assets/images/popup/Twitter.png`}
                width={50}
                height={50}
                className="object-contain w-full h-full"
                alt="close1"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
