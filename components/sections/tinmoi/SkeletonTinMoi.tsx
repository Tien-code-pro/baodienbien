import SkeletonImage from "@/components/common/Skeleton/SkeletonImage";
import SkeletonText from "@/components/common/Skeleton/SkeletonText";

export default function SkeletonTinMoi() {
    return <>
        <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex lg:space-x-4">
                <div className="flex flex-col w-full ">
                    {
                        Array(4).fill(0).map((e, i, arr) => (
                            <>
                                <div key={i} className={`flex gap-5 items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${i === arr.length - 1
                                    ? ""
                                    : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                                    }`}>
                                    <SkeletonImage widthClass="w-[150px] lg:w-[270px] " heightClass="h-[100px] lg:h-[180px]" className="" />
                                    <div className="flex flex-col w-full">
                                        <SkeletonText widthClass="w-full h-[15px]" className="text-[#3C3C3C] line-clamp-4 lg:text-[#434343] lg:text-[30px] lg:font-bold lg:line-clamp-2 leading-snug" />
                                        <SkeletonText widthClass="w-full h-[15px]" className="hidden lg:flex my-3 text-[#8B8B8B]" />
                                        <SkeletonText widthClass="w-full h-[15px]" className="hidden my-3 text-[#868686] text-[17px] lg:line-clamp-2" />
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
}