import SkeletonImage from "@/components/common/Skeleton/SkeletonImage";
import SkeletonText from "@/components/common/Skeleton/SkeletonText";

export default function SkeletonListTin() {
    return <>
        <div className="container mx-auto xl:max-w-[1200px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div
                    className={`text-[#212529] w-full mx-auto ml-0 text-2xl lg:text-[30px] font-bold uppercase flex-shrink-0`}
                >
                    <SkeletonText widthClass="w-full lg:w-[440px]" heightClass="h-[15px]" />
                </div>
            </div>
            <hr className="[border-top:1px_solid_#CED1D8] my-6" />
            <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">

                <div className={`flex flex-col w-full lg:w-[570px] flex-shrink-0`}>
                    <SkeletonImage widthClass="w-full" heightClass="h-[220px] lg:h-[400px]" className="" />
                    <div className="flex flex-col w-full ">
                        <SkeletonText widthClass="w-full  h-[15px]" className="text-xl lg:text-[30px] leading-snug text-black lg:text-[#434343] font-bold line-clamp-2 mt-2 lg:mt-5" />
                        <SkeletonText widthClass="w-full  h-[15px]" className="block lg:hidden text-[#D62127] text-[11px] mt-4" />
                        <SkeletonText widthClass="w-full  h-[15px]" className="text-[#3C3C3C] lg:text-[#434343] line-clamp-5 lg:line-clamp-3 mt-4" />
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 ">
                    <div className="flex flex-wrap -mx-3 ">
                        {
                            Array(4).fill(0).map((e, i) => (
                                <div key={i} className="flex flex-col mx-3 w-[calc(50%_-_24px)] lg:w-[270px] mb-9">
                                    <div >
                                        <SkeletonImage widthClass="w-full" heightClass="h-[100px] lg:h-[180px]" className="" />
                                        <div className={`text-[#3C3C3C] w-full mt-3 lg:mt-4 line-clamp-3 text-base lg:text-[18px]`}>
                                            <SkeletonText widthClass=" h-[15px]" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <hr className="[border-top:1px_solid_#CED1D8]" />
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