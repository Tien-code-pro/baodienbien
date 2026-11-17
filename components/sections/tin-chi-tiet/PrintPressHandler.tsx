"use client"; // Mark this as a client component
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Article } from "@/types/articleNews";
import Shares from "./Shares";
import { mulish, poppins } from "@/components/hooks/font";
import moment from "moment";
import { decode } from "html-entities";
import { useReactToPrint } from "react-to-print";
const KeyPressHandler = ({
  article,
  slug,
}: {
  article: Article | null;
  slug: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault(); // Prevent default print dialog
        // Add your custom logic here
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <section
      ref={contentRef}
      className={`${mulish.className} pt-8 px-4 2xl:px-0`}
    >
      <div className="container mx-auto xl:max-w-[1200px]">
        <div className={`${poppins.className} text-[#777777] mb-5 lg:mb-3`}>
          {article && article.category_name}
        </div>
        <div
          className={`${poppins.className} text-[#474747] font-bold lg:text-[30px] mb-3`}
        >
          {article && article.article_title}
        </div>
        <div className={`${poppins.className} text-[#C5C5C5] mb-5`}>
          {article && article.author_name} |{" "}
          {article &&
            moment(article.publish_date).format("hh:mm:ss DD/MM/YYYY")}
        </div>

        <hr className="[border-top:1px_solid_#CED1D8] mb-5" />
        <div className={`text-[#5A5A5A] mb-5 leading-6`}>
          {article && article.article_sapo}
        </div>
        <Image
          width={335}
          height={220}
          alt="img1"
          src={`/assets/images/tinchitiet/img1.jpg`}
          className="object-cover mb-5 w-full lg:max-w-[822px] lg:h-[416px] mx-auto"
        />
      </div>
      <div className="container mx-auto xl:max-w-[1200px]">
        {/* <Shares slug={slug || ""}/> */}
        <section className="print-only">
          {article && (
            <>
              <div
                className="detail-news-icon text-black editor-content"
                dangerouslySetInnerHTML={{
                  __html: decode(article.article_content),
                }}
              ></div>
            </>
          )}
        </section>
      </div>
    </section>
  ); // This component doesn't render anything
};

export default KeyPressHandler;
