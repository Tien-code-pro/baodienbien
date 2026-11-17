"use client";
import TamDiemDaPhuongTien from "@/components/sections/home/TamDiemDaPhuongTien";
import ShortVideo from "@/components/sections/home/ShortVideo";
import TinQuangCao from "@/components/sections/home/TinQuangCao";
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver";
import HomeCategory from "@/components/sections/home/HomeCategory";
export default function TrangChuLazyView() {
  const [isInBottomView, refBottomView] = useIntersectionObserver(
    0.1,
    "-150px",
    "h-[200px]"
  );
  const [isInCategoryView, refCategoryView] = useIntersectionObserver(
    0.1,
    "-150px",
    "h-[200px]"
  );

  return (
    <>
      <TamDiemDaPhuongTien />
      <div className="opacity-0 h-[200px]" ref={refCategoryView}>
        {isInCategoryView && (
          <>
            <HomeCategory />
          </>
        )}
      </div>

      <div className="opacity-0 h-[200px]" ref={refBottomView}>
        {isInBottomView && (
          <>
            <ShortVideo />
            <TinQuangCao />
          </>
        )}
      </div>
    </>
  );
}
