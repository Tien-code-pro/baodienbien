"use client";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import useFont from "@/components/hooks/useFont";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import PageTypePC5 from "@/components/pageTypePC/PageTypePC5";
import TinDaLuu from "./tindaluu";
import ThongTinChung from "./ThongTinChung";
import { getListFeedback } from "@/services/client-side/services-api/service-api-tu";
import { IFeedback } from "@/types/paramTypes";
import moment from "moment";
import TinDaXem from "./TinDaXem";
import { getAccountInfor } from "@/services/client-side/services-api/serviceAnhht-api";
import { IUserAccount } from "@/types/apiTypes";
import { getBannerHeader } from "@/services/client-side/services-api/service-api-tien";
import { HeaderType } from "@/types/articleNews";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
const ThongTinTaiKhoan = () => {
  const [listFeedBack, setListFeedBack] = useState<IFeedback[]>([]);
  const { mulish, barlow, poppins } = useFont();
  const [accountInfo, setAccountInfo] = useState<IUserAccount | null>(null);
  const [headerInfo, setHeaderInfo] = useState<HeaderType>();

  const { isLogin } =
    useAppSelector((state: RootState) => state.app);
    
  useEffect(() => {
    getListFeedback({ offset: 0, limit: -1 }).then((res) => {
      if (res && res.data && res.data.status > 0) {
        setListFeedBack(res.data.data.list);
      }
    });
    getBannerHeader().then((res) => {
      if (res && res.data && res.data.status > 0) {
        setHeaderInfo(res.data.data);
      }
    });
  }, []);
  useEffect(() => {
    if (isLogin) {
      getAccountInfor({}).then((res) => {
        if (res && res.status > 0) {
          setAccountInfo(res.data.data);
        }
      });
    }
  }, []);
  return (
    <>
      <section className={`px-4 2xl:px-0 ${mulish.className} py-10`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <Tabs
            value="ttc"
            className="flex flex-col lg:flex-row lg:space-x-16 w-full *:w-full"
          >
            <div className="flex flex-col w-full lg:w-[343px]">
              <div className="p-4 flex flex-col [border:1px_solid_#CED1D8]">
                <div className="flex items-center space-x-4">
                  <Image
                    src={`/assets/images/tttk/avata.jpg`}
                    width={90}
                    height={90}
                    className="object-cover w-[90px] h-[90px] rounded-[50%]"
                    alt="avata"
                  />
                  <div className="flex flex-col">
                    <div
                      className={`text-[18px] text-[#212529] font-bold ${barlow.className} line-clamp-1`}
                    >
                      {accountInfo?.user_name}
                    </div>
                    <div
                      className={`text-[18px] text-[#858585] ${barlow.className} line-clamp-1`}
                    >
                      {accountInfo && accountInfo.created_date && `Tham gia từ ${moment(accountInfo.created_date).format("MM/yyyy")}`}
                    </div>
                  </div>
                </div>
                <hr className="[border-top:1px_solid_#CED1D8] my-4" />
                <TabsHeader
                  className="flex flex-col"
                  indicatorProps={{
                    className: "bg-transparent",
                  }}
                >
                  <Tab
                    value="ttc"
                    activeClassName="!text-[#212529]"
                    className={`${barlow.className} text-[#838383] text-[18px] flex justify-start`}
                  >
                    Thông tin chung
                  </Tab>
                  <Tab
                    value="ykcb"
                    activeClassName="!text-[#212529]"
                    className={`${barlow.className} text-[#838383] text-[18px] flex justify-start mt-4`}
                  >
                    Ý kiến của bạn ({listFeedBack && listFeedBack.length})
                  </Tab>
                  <Tab
                    value="tdl"
                    activeClassName="!text-[#212529]"
                    className={`${barlow.className} text-[#838383] text-[18px] flex justify-start mt-4`}
                  >
                    Tin đã lưu
                  </Tab>
                  <Tab
                    value="tdx"
                    activeClassName="!text-[#212529]"
                    className={`${barlow.className} text-[#838383] text-[18px] flex justify-start mt-4`}
                  >
                    Tin đã xem
                  </Tab>

                  <div
                    className={`${barlow.className} text-[18px] text-[#838383] items-center mt-4 flex justify-start py-1 px-2`}
                  >
                    Thoát
                    <Image
                      src={`/assets/images/tttk/logout-02.png`}
                      width={24}
                      height={24}
                      className="object-contain ml-4"
                      alt="logout"
                    />
                  </div>
                </TabsHeader>
              </div>

              <div className="mt-5 flex flex-col bg-[#EDEDED] p-4">
                <div
                  className={`${barlow.className} text-[#212529] text-[18px]`}
                >
                  Cần hỗ trợ, vui lòng liên hệ:
                </div>
                <div
                  className={`${barlow.className} text-[#0C8FEE] text-[18px] underline`}
                >
                  {headerInfo?.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[calc(100%_-_343px)] mt-10 lg:mt-0">
              <TabsBody
                className="overflow-visible"
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="ttc" className="p-0 ">
                  <ThongTinChung />
                </TabPanel>
                <TabPanel value="ykcb" className="p-0">
                  <div className="flex flex-col ">
                    <div className="text-black font-bold text-xl lg:text-[22px]">
                      Ý kiến của bạn
                    </div>
                    {/* <div className="mt-5 text-sm text-[#757575]">
                   Bạn chưa chia sẻ ý kiến nào.
                    </div> */}

                    {listFeedBack &&
                      listFeedBack.length > 0 &&
                      listFeedBack.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-col py-5 [border-bottom:0.5px_solid_#D9D9D9] lg:border-t-0"
                          >
                            <div className="mb-3 text-sm text-[#9F9F9F]">
                              {moment(e.created_date).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </div>
                            <PageTypePC5
                              hrefL={"#"}
                              num={11}
                              sizeImage={{ width: 150, height: 100 }}
                              classDiv={`flex items-start w-full `}
                              classImage={`object-cover w-[150px] h-[100px] lg:w-[160px] mr-4`}
                              linkImage={`/assets/images/home/img1.jpg`}
                              classTitle="text-black line-clamp-3 lg:font-bold lg:line-clamp-2 leading-snug mb-2"
                              title={e.title}
                              altImage={""}
                              day=""
                              loai=""
                              check={false}
                            />
                          </div>
                        );
                      })}
                  </div>
                </TabPanel>
                <TabPanel value="tdl" className="p-0">
                  <TinDaLuu />
                </TabPanel>
                <TabPanel value="tdx" className="p-0">
                  <TinDaXem />
                </TabPanel>
              </TabsBody>
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
};
export default ThongTinTaiKhoan;
