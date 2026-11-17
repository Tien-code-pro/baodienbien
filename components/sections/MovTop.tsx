"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCheckMobile from "../hooks/useCheckMobile";

const MovTop = () => {
  const isMobile = useCheckMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Xác định khi nào nút "Scroll to Top" nên hiển thị dựa trên vị trí cuộn
  // console.log(window.scrollY);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Xử lý sự kiện khi nút được nhấn để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top-button fixed w-[40px] h-[66px] lg:w-[60px] lg:h-[60px] bottom-10 lg:bottom-[90px] right-4 lg:right-[20px] opacity-80 cursor-pointer z-50 hover:opacity-100
        "
          onClick={scrollToTop}
        >
          <Image
            src={"/assets/images/movtop.png"}
            alt="Mov Top"
            className="w-full"
            width={58}
            height={66}
          />
        </button>
      )}
    </>
  );
};

export default MovTop;
