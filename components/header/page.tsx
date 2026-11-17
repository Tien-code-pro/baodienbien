"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import SpinLoading from "../common/Loading/spin-loading";
import appSlice from "@/app/appSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
import {
  getToken,
  removeToken,
  setToken,
} from "@/services/client-side/axios.config";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import localFont from "next/font/local";
import useFont from "../hooks/useFont";
import MovTop from "../sections/MovTop";
import DangKy from "../modals/DangKy";
import DangNhap from "../modals/DangNhap";
import { isMobile } from "react-device-detect";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useProfile } from "../features/hook/UserHooks";
import { ArticleChildCategory, CategoryMenu } from "@/types/category";
import { getAccountInfo } from "@/services/client-side/auth/auth.api";
import { data } from "jquery";
import { getBannerHeader } from "@/services/client-side/services-api/service-api-tien";
import { HeaderType } from "@/types/articleNews";
import { getMenuHeader } from "@/services/client-side/services-api/service1";
import moment from "moment";
import { env } from "next-runtime-env";
const Header = () => {
  const router = useRouter();
  const {
    updateModalState,
    loadingLoginAPI,
    setLogin,
    setLogout,
    loadingCallAPI,
    finishLoad,
    scrollToTab,
    setAccountName,
    setTokenRedux,
    setEmailRegister,
  } = appSlice.actions;
  const { refresh, isLogin, loadingLogin, modal, accountName, emailRegister } =
    useAppSelector((state: RootState) => state.app);
  const { mulish } = useFont();
  const dispatch = useDispatch();
  const [hrefJS, setHrefJS] = useState(0);
  const [accountInfoLoading, setAccountInfoLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [inforHeader, setInforHeader] = useState<HeaderType>();
  const [menu, setMenu] = useState<CategoryMenu[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    getBannerHeader().then((res) => {
      if (res.data.data && res.data.status > 0) {
        setInforHeader(res.data.data);
      }
    });
    getMenuHeader().then((res) => {
      if (
        res.data.data &&
        res.data.status > 0 &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setMenu(res.data.data.list);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    getToken()
      .then((token) => {
        setAccountInfoLoading(true);
        if (token) {
          setToken(token);
          getAccountInfo().then((res) => {
            dispatch(setAccountName(res.data.data.full_name));
            dispatch(setTokenRedux(token));
            dispatch(setLogin());
            dispatch(setEmailRegister(res.data.data.user_name));
          });
        }
      })
      .finally(() => {
        setAccountInfoLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsClient((prev) => !prev);
  }, []);
  useEffect(() => {
    if (!isLogin && pathname === "/thong-tin-tai-khoan") redirect("/");
  }, [pathname]);
  const logOut = () => {
    removeToken();
    dispatch(setLogout());
    window.location.reload();
  };

  const showmnmb = () => {
    const submnmb = document.querySelector(".submnmb");
    submnmb?.classList.toggle("hidden");
  };
  const showSubMn = () => {
    const showSubMn = document.querySelector(".showSubMn");
    showSubMn?.classList.toggle("hidden");
  };

  const [showSearch, setShowSearch] = useState(false);
  const [showMBSearch, setShowMBSearch] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const getWeedDayName = (i: number) => {
    switch (i) {
      case 1:
        return "Thứ Hai";
      case 2:
        return "Thứ Ba";
      case 3:
        return "Thứ Tư ";
      case 4:
        return " Thứ Năm";
      case 5:
        return "Thứ Sáu";
      case 6:
        return " Thứ Bảy";
      case 7:
        return " Chủ Nhật";
    }
  };

  // // vị trí addClass header để ẩn
  useEffect(() => {
    var lastScrollTop = 0;
    const onScroll = () => {
      let check = false;
      var st = window.pageYOffset || document.documentElement.scrollTop;
      check = st < lastScrollTop; // Simplified check
      lastScrollTop = st <= 0 ? 0 : st; // Update lastScrollTop directly

      const id = document.getElementById("body-tag");
      // if (id) {
      //   if (check) {
      //     id.classList.remove("closeHeader");
      //   } else if (window.scrollY > 200) {
      //     id.classList.add("closeHeader");
      //   } else {
      //     id.classList.remove("closeHeader");
      //   }
      // }
      if (id) {
        if (window.scrollY > 200) {
          id.classList.add("closeHeader");
        } else {
          id.classList.remove("closeHeader");
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const handleKeyPress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Trigger the search when the user presses Enter
    setShowSearch(false);
    router.push(`/tim-kiem/?search=${searchValue}&page=1`);
  };
  const pathName = usePathname();
  if (pathName.includes("/vertify-new-password")) {
    return <></>;
  }
  if (!isClient) return;

  return (
    <>
      {!pathName.includes("tin-tuc-full2") &&
        !pathName.includes("doc-bao") &&
        !pathName.includes("short-video/") &&
        !pathName.includes("e-magazine") && (
          <>
            {modal ? modal : <></>}
            <MovTop />
            <header
              className={`headerTop shadow-[0_4px_4px] shadow-black/[0.05] bg-white z-[900]`}
            >
              <div>
                <div className="hidden lg:block bg-[#F5F7F9] px-4 2xl:px-0">
                  <div className="container mx-auto xl:max-w-[1200px]">
                    <div className="flex items-center justify-between h-[30px]">
                      <div className="text-[13px] text-[#7A7A7A]">
                        {getWeedDayName(moment().weekday())}, ngày{" "}
                        {moment().format("DD/MM/YYYY")}
                      </div>
                      <div className="flex items-center justify-end">
                        <div className=" text-[#7A7A7A] text-[13px] mr-4">
                          Hotline: {inforHeader?.phone_number}
                          <strong className="mx-2 font-normal">|</strong> Theo
                          dõi báo Điện Biên Phủ qua
                        </div>
                        <Link
                          target="_blank"
                          href={inforHeader?.facebook_link || ""}
                        >
                          <Image
                            src={`/assets/images/icon1.png`}
                            width={8}
                            height={15}
                            alt="Facebook"
                            className="object-contain mx-2"
                          />
                        </Link>
                        <Link
                          target="_blank"
                          href={inforHeader?.tiktok_link || ""}
                        >
                          <Image
                            src={`/assets/images/icon2.png`}
                            width={13}
                            height={15}
                            alt="TickTok"
                            className="object-contain mx-2"
                          />
                        </Link>
                        <Link
                          target="_blank"
                          href={inforHeader?.youtube_link || ""}
                        >
                          <Image
                            src={`/assets/images/icon3.png`}
                            width={17}
                            height={12}
                            alt="Youtube"
                            className="object-contain mx-2"
                          />
                        </Link>
                        <Link
                          target="_blank"
                          href={inforHeader?.zalo_link || ""}
                        >
                          <Image
                            src={`/assets/images/icon4.png`}
                            width={34}
                            height={24}
                            alt="Youtube"
                            className="w-[17px] object-contain mx-2"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 2xl:px-0 py-2 lg:py-4 [border-bottom:1px_solid_#F0F0F0]">
                  <div className="container mx-auto xl:max-w-[1200px]">
                    <div className="relative flex items-center justify-between">
                      {/*Menu Mobile*/}
                      <div className="lg:hidden flex items-center h-full">
                        <Image
                          width={23}
                          height={18}
                          alt="MenuMB"
                          src={`/assets/images/icon21.png`}
                          className={`${showIcon ? "hidden" : ""}`}
                          onClick={() => {
                            showmnmb();
                            setShowIcon(true);
                          }}
                        />
                        <Image
                          width={23}
                          height={18}
                          alt="MenuMB"
                          src={`/assets/images/popup/Vector.png`}
                          className={`${showIcon ? "" : "hidden"}`}
                          onClick={() => {
                            showmnmb();
                            setShowIcon(false);
                          }}
                        />
                        <div className="submnmb flex z-[9999] absolute top-full left-0 right-0 bg-white hidden flex-wrap -mx-3 overflow-auto items-start h-[100vh] pt-10">
                          {menu.map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="flex flex-col mx-3 w-[calc(50%_-_24px)] mb-10 pb-10 [border-bottom:1px_solid_#D9D9D9]"
                              >
                                <div className="text-sm text-black font-bold">
                                  {e.menu_name}
                                </div>
                                {e.child_menu &&
                                  e.child_menu.map((ele, index) => {
                                    return (
                                      <Link
                                        href={`/${e.menu_slug}/${ele.menu_slug}`}
                                        className="text-sm text-[#3C3C3C]"
                                        key={index}
                                        onClick={() => {
                                          showmnmb();
                                          setShowIcon(false);
                                        }}
                                      >
                                        {ele.menu_name}
                                      </Link>
                                    );
                                  })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/*Menu Mobile*/}

                      <Link href={`/`} className="">
                        <Image
                          src={`${
                            inforHeader?.banner_url
                              ? inforHeader?.banner_url
                              : "/assets/images/logo.png"
                          }`}
                          width={448}
                          height={115}
                          className="w-[215px] lg:w-[450px] h-auto object-contain"
                          alt="Logo"
                        />
                      </Link>

                      {/* For Printing */}
                      <div id="banner-logo" className="hidden">
                        <div className="headerTopPrint">
                          <div className="container mx-auto xl:max-w-[1200px]">
                            <Image
                              src={`${
                                inforHeader?.banner_url
                                  ? inforHeader?.banner_url
                                  : "/assets/images/logo.png"
                              }`}
                              width={448}
                              height={115}
                              className="w-[450px] h-auto object-contain"
                              alt="Logo"
                            />
                          </div>
                        </div>
                      </div>
                      {/* For Printing */}

                      <div className="hidden lg:flex items-center justify-between space-x-5 xl:space-x-8">
                        <Link
                          href={`/tin-moi`}
                          className="flex items-center cursor-pointer group/mn"
                        >
                          <div
                            className={`rounded-[50%] group-hover/mn:[border:1px_dashed_#D62127] ${
                              pathname === "/tin-moi"
                                ? "[border:1px_dashed_#D62127]"
                                : "[border:1px_dashed_#AEB6BE]"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center rounded-[50%] w-10 h-10 group-hover/mn:bg-[#D62127] ${
                                pathname === "/tin-moi"
                                  ? "bg-[#D62127]"
                                  : "bg-[#F5F7F9] "
                              }`}
                            >
                              <Image
                                src={`/assets/images/icon17.png`}
                                width={20}
                                height={20}
                                className={`hidden group-hover/mn:block group-hover/mn:[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)]  ${
                                  pathname === "/tin-moi"
                                    ? "[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)] !block"
                                    : "[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)]"
                                }`}
                                alt="icon17"
                              />
                              <Image
                                src={`/assets/images/icon17-1.png`}
                                width={20}
                                height={20}
                                className={`[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:hidden ${
                                  pathname === "/tin-moi" ? "hidden" : ""
                                }`}
                                alt="icon17"
                              />
                            </div>
                          </div>
                          <div
                            className={`text-[#7A8489] text-sm ${mulish.className} ml-3 group-hover/mn:text-[#D62127]`}
                          >
                            Tin mới
                          </div>
                        </Link>
                        <Link
                          href={`/bao-in`}
                          className="flex items-center cursor-pointer group/mn"
                        >
                          <div
                            className={`rounded-[50%] group-hover/mn:[border:1px_dashed_#D62127] ${
                              pathname === "/bao-in"
                                ? "[border:1px_dashed_#D62127]"
                                : "[border:1px_dashed_#AEB6BE]"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center rounded-[50%] w-10 h-10 group-hover/mn:bg-[#D62127] ${
                                pathname === "/bao-in"
                                  ? "bg-[#D62127]"
                                  : "bg-[#F5F7F9] "
                              }`}
                            >
                              <Image
                                src={`/assets/images/icon18.png`}
                                width={20}
                                height={20}
                                className={`hidden group-hover/mn:block group-hover/mn:[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)]  ${
                                  pathname === "/bao-in"
                                    ? "[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)] !block"
                                    : "[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)]"
                                }`}
                                alt="icon18"
                              />
                              <Image
                                src={`/assets/images/icon18-1.png`}
                                width={20}
                                height={20}
                                className={`[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:hidden ${
                                  pathname === "/bao-in" ? "hidden" : ""
                                }`}
                                alt="icon18"
                              />
                            </div>
                          </div>
                          <div
                            className={`text-[#7A8489] text-sm ${
                              mulish.className
                            } ml-3 group-hover/mn:text-[#D62127] ${
                              pathname === "/bao-in" ? "text-[#D62127]" : ""
                            }`}
                          >
                            Báo in
                          </div>
                        </Link>
                        <Link
                          href={`https://en.baodienbienphu.com.vn/`}
                          className="flex items-center cursor-pointer group/mn"
                        >
                          <div
                            className={`rounded-[50%] group-hover/mn:[border:1px_dashed_#D62127] ${
                              pathname === "/dien-bien-phu-english"
                                ? "[border:1px_dashed_#D62127]"
                                : "[border:1px_dashed_#AEB6BE]"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center rounded-[50%] w-10 h-10 group-hover/mn:bg-[#D62127] ${
                                pathname === "/dien-bien-phu-english"
                                  ? "bg-[#D62127]"
                                  : "bg-[#F5F7F9] "
                              }`}
                            >
                              <Image
                                src={`/assets/images/icon19.png`}
                                width={20}
                                height={20}
                                className={`hidden group-hover/mn:block group-hover/mn:[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)]  ${
                                  pathname === "/dien-bien-phu-english"
                                    ? "[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)] !block"
                                    : "[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)]"
                                }`}
                                alt="icon19"
                              />
                              <Image
                                src={`/assets/images/icon19-1.png`}
                                width={20}
                                height={20}
                                className={`[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:hidden ${
                                  pathname === "/dien-bien-phu-english"
                                    ? "hidden"
                                    : ""
                                }`}
                                alt="icon19"
                              />
                            </div>
                          </div>
                          <div
                            className={`text-[#7A8489] text-sm text-center ${
                              mulish.className
                            } ml-3 group-hover/mn:text-[#D62127] ${
                              pathname === "/dien-bien-phu-english"
                                ? "text-[#D62127]"
                                : ""
                            }`}
                          >
                            DIEN BIEN PHU <br className="xl:hidden" />- ENGLISH
                          </div>
                        </Link>
                        <button className="flex items-center cursor-pointer group/mn relative">
                          {accountInfoLoading ? (
                            <div className="w-full flex">
                              <SpinLoading
                                color="#D62127"
                                width={20}
                                height={20}
                              />
                            </div>
                          ) : (
                            <>
                              {!isLogin ? (
                                <>
                                  <div
                                    className={`rounded-[50%] [border:1px_dashed_#AEB6BE] group-hover/mn:[border:1px_dashed_#D62127] `}
                                    onClick={() => {
                                      dispatch(updateModalState(<DangNhap />));
                                    }}
                                  >
                                    <div
                                      className={`flex items-center justify-center rounded-[50%] w-10 h-10 bg-[#F5F7F9] group-hover/mn:bg-[#D62127]`}
                                    >
                                      <Image
                                        src={`/assets/images/icon20.png`}
                                        width={20}
                                        height={20}
                                        className={`hidden group-hover/mn:block [filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)]  `}
                                        alt="icon20"
                                      />
                                      <Image
                                        src={`/assets/images/icon20-1.png`}
                                        width={20}
                                        height={20}
                                        className={`[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:hidden`}
                                        alt="icon20"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className={`text-[#7A8489] text-sm ${mulish.className} ml-3 group-hover/mn:text-[#D62127] `}
                                    onClick={() => {
                                      dispatch(updateModalState(<DangNhap />));
                                    }}
                                  >
                                    Đăng nhập
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className={`flex items-center space-x-2 cursor-pointer`}
                                  >
                                    <Image
                                      src={`/assets/images/tttk/avata.jpg`}
                                      width={30}
                                      height={30}
                                      className="object-cover rounded-[50%] w-[30px] h-[30px]"
                                      alt="avata"
                                    />
                                    <div className="text-xs text-[#6c757d]">
                                      {accountName}
                                    </div>

                                    <Image
                                      src={`/assets/images/tttk/Vector.png`}
                                      width={10}
                                      height={4}
                                      className="object-contain group-hover/mn:rotate-180 transition-all"
                                      alt="Vector"
                                    />
                                  </div>
                                  <div
                                    className={`z-[9999] group-hover/mn:flex flex-col items-start hidden absolute top-full right-0 p-4 shadow-[0_3px_5px_rgba(0,0_,_0_,_.1)] bg-[#f8f9fa] w-[250px] ${mulish.className}`}
                                  >
                                    <div className="text-sm text-[#212529]">
                                      Xin chào,{" "}
                                      <strong className="">
                                        {accountName}
                                      </strong>
                                    </div>
                                    <hr className="my-3 [border-top:1px_solid_rgba(0,_0,_0,_.1)]" />

                                    <Link
                                      href={`/thong-tin-tai-khoan`}
                                      className="text-sm text-[#212529] hover:text-[#D62127]"
                                    >
                                      Thông tin cá nhân
                                    </Link>
                                    <Link
                                      href={`/lien-he`}
                                      className="text-sm text-[#212529] hover:text-[#D62127] mt-4"
                                    >
                                      Liên hệ
                                    </Link>

                                    <div
                                      onClick={() => {
                                        logOut();
                                      }}
                                      className="text-sm text-[#212529] mt-4 hover:text-[#D62127]"
                                    >
                                      Đăng xuất
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex items-center lg:hidden">
                        <div className="lg:hidden">
                          <button
                            onClick={() => setShowMBSearch(true)}
                            className={`${
                              showMBSearch ? "hidden" : "flex"
                            } w-[58px] h-[58px]  justify-center items-center flex-shrink-0`}
                          >
                            <Image
                              src={`/assets/images/icon15.png`}
                              width={24}
                              height={24}
                              className={`object-contain hover:[filter:brightness(0)_saturate(100%)_invert(20%)_sepia(80%)_saturate(3057%)_hue-rotate(344deg)_brightness(88%)_contrast(99%)] ${
                                showMBSearch ? "hidden" : ""
                              }`}
                              alt="icon15"
                            />
                          </button>
                          <button
                            onClick={() => setShowMBSearch(false)}
                            className={`w-[58px] h-[58px] flex justify-center items-center flex-shrink-0 text-2xl text-[#6c757d] hover:text-[#d72027] ${
                              showMBSearch ? "" : "hidden"
                            }`}
                          >
                            X
                          </button>
                        </div>
                        <div
                          className={`${
                            showMBSearch ? "flex" : "hidden"
                          } absolute top-full -left-4 -right-4 h-[100vh] bg-[rgba(0,_0,_0,_.5)] z-10`}
                        >
                          <div className="p-2 bg-[#f8f9fa] w-full h-[61px]">
                            <div className="container mx-auto max-w-[1200px]">
                              <div className="w-full lg:w-[400px] ml-auto relative">
                                <form
                                  onSubmit={handleKeyPress}
                                  className="flex items-center space-x-1 [border:1px_solid_rgba(0,_0,_0,_.2)] rounded-[20px] pr-1"
                                >
                                  <input
                                    placeholder="Tìm kiếm"
                                    type="text"
                                    className="w-full h-10 rounded-[20px] border-none outline-none pl-5 text-sm text-[#6c757d]"
                                    onChange={(e) =>
                                      setSearchValue(e.target.value)
                                    }
                                    value={searchValue}
                                  />
                                  <button
                                    type="submit"
                                    onClick={() => setShowSearch(false)}
                                    // This will submit the form when the "Enter" key is pressed
                                    className="bg-[#b40c0e] uppercase text-[13px] h-[34px] w-[90px] rounded-[20px] font-bold flex-shrink-0 flex justify-center items-center"
                                  >
                                    Tìm kiếm
                                  </button>
                                </form>
                                {/* <input
                                  placeholder="Tìm kiếm"
                                  type="text"
                                  className="w-full h-10 rounded-[20px] border-none outline-none pl-5 text-sm text-[#6c757d]"
                                  onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <Link
                                  onClick={() => setShowSearch(false)}
                                  href={`/tim-kiem/?search=${searchValue}&page=1`}
                                  className="bg-[#b40c0e] uppercase text-[13px] h-[34px] w-[90px] rounded-[20px] font-bold flex-shrink-0 flex justify-center items-center"
                                >
                                  Tìm kiếm
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:hidden relative group/mn">
                          {!isLogin ? (
                            <>
                              {/* <div
                            className={`rounded-[50%] [border:1px_dashed_#AEB6BE] group-hover/mn:[border:1px_dashed_#D62127] `}
                            onClick={() => {
                              dispatch(updateModalState(<DangNhap />));
                            }}
                          >
                            <div
                              className={`flex items-center justify-center rounded-[50%] w-10 h-10 bg-[#F5F7F9] group-hover/mn:bg-[#D62127]`}
                            >
                              <Image
                                src={`/assets/images/icon20.png`}
                                width={20}
                                height={20}
                                className={`hidden group-hover/mn:block [filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:[filter:invert(100%)_sepia(99%)_saturate(0%)_hue-rotate(346deg)_brightness(102%)_contrast(100%)]  `}
                                alt="icon20"
                              />
                              <Image
                                src={`/assets/images/icon20-1.png`}
                                width={20}
                                height={20}
                                className={`[filter:invert(17%)_sepia(100%)_saturate(3048%)_hue-rotate(347deg)_brightness(91%)_contrast(93%)] group-hover/mn:hidden`}
                                alt="icon20"
                              />
                            </div>
                          </div> */}
                              <div
                                className={`text-[#7A8489] text-sm ${mulish.className} ml-3 group-hover/mn:text-[#D62127] `}
                                onClick={() => {
                                  dispatch(updateModalState(<DangNhap />));
                                }}
                              >
                                Đăng nhập
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className={`flex items-center space-x-2 cursor-pointer`}
                              >
                                <Image
                                  src={`/assets/images/tttk/avata.jpg`}
                                  width={30}
                                  height={30}
                                  className="object-cover rounded-[50%] w-[30px] h-[30px]"
                                  alt="avata"
                                />

                                <Image
                                  src={`/assets/images/tttk/Vector.png`}
                                  width={10}
                                  height={4}
                                  className="object-contain group-hover/mn:rotate-180 transition-all"
                                  alt="Vector"
                                />
                              </div>
                              <div
                                className={`z-[9999] group-hover/mn:flex flex-col items-start hidden absolute top-full right-0 p-4 shadow-[0_3px_5px_rgba(0,0_,_0_,_.1)] bg-[#f8f9fa] w-[250px] ${mulish.className}`}
                              >
                                <div className="text-sm text-[#212529]">
                                  Xin chào,{" "}
                                  <strong className="">{accountName}</strong>
                                </div>
                                <hr className="my-3 [border-top:1px_solid_rgba(0,_0,_0,_.1)]" />

                                <Link
                                  href={`/thong-tin-tai-khoan`}
                                  className="text-sm text-[#212529] hover:text-[#D62127]"
                                >
                                  Thông tin cá nhân
                                </Link>
                                <Link
                                  href={`/lien-he`}
                                  className="text-sm text-[#212529] hover:text-[#D62127] mt-4"
                                >
                                  Liên hệ
                                </Link>
                                <div
                                  onClick={() => {
                                    logOut();
                                  }}
                                  className="text-sm text-[#212529] mt-4 hover:text-[#D62127]"
                                >
                                  Đăng xuất
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 2xl:px-0 [border-bottom:1px_solid_#F0F0F0] relative">
                <div className="container mx-auto xl:max-w-[1200px]">
                  <div className="flex justify-between items-center h-[45px]">
                    <Link
                      href={`/`}
                      className="w-10 lg:w-[45px] h-[45px] lg:bg-[#F5F7F9] flex justify-start lg:justify-center items-center flex-shrink-0"
                    >
                      <Image
                        src={`/assets/images/icon22.png`}
                        width={24}
                        height={24}
                        className="object-contain"
                        alt="Home"
                      />
                    </Link>

                    <div className="flex justify-start items-cente mr-auto h-full overflow-hidden overflow-x-auto ctscroll">
                      {menu
                        .filter((e, i) => i <= 10)
                        .map((e, i) => {
                          return (
                            <Link
                              href={`/tin-tuc/${e.menu_slug}`}
                              key={i}
                              // active thi them [border-bottom:1px_solid_#d72027] text-[#d72027]
                              className={`
                              ${
                                mulish.className
                              } text-[#212529] font-semibold text-[13px] text-nowrap flex-shrink-0 
                              uppercase relative group/show h-full flex items-center 
                              justify-center hover:text-[#d72027] hover:bg-[#f8f9fa] px-2
                              ${
                                pathname.includes(e.menu_slug) ||
                                e.child_menu?.filter((e) => {
                                  if (
                                    e.menu_slug &&
                                    pathName.includes(e.menu_slug)
                                  ) {
                                    return true;
                                  }
                                }).length > 0
                                  ? "text-[#d72027] border-b-[1px] border-[#d72027]"
                                  : ""
                              }
                              `}
                            >
                              {e.menu_name}
                              <div
                                className={`fixed ctshowmenu top-[106px] lg:top-[208px] ${
                                  isMobile
                                    ? "left-0 right-0 lg:left-auto lg:right-auto"
                                    : "left-auto right-auto"
                                } flex-col hidden lg:group-hover/show:flex bg-white py-2 shadow-[0_3px_5px_rgba(0,_0,_0,_.1)]`}
                              >
                                {e.child_menu &&
                                  e.child_menu.map((element, index) => {
                                    return (
                                      <Link
                                        href={`/${e.menu_slug}/${element.menu_slug}`}
                                        key={index}
                                        className="text-sm text-[#343a40] px-4 py-3 hover:text-[#d72027] hover:bg-[#eee]"
                                      >
                                        {element.menu_name}
                                      </Link>
                                    );
                                  })}
                              </div>
                            </Link>
                          );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center">
                      <button
                        onClick={() => setShowSearch(true)}
                        className={`${
                          showSearch ? "hidden" : "flex"
                        } w-[58px] h-[58px]  justify-center items-center flex-shrink-0`}
                      >
                        <Image
                          src={`/assets/images/icon15.png`}
                          width={24}
                          height={24}
                          className={`object-contain hover:[filter:brightness(0)_saturate(100%)_invert(20%)_sepia(80%)_saturate(3057%)_hue-rotate(344deg)_brightness(88%)_contrast(99%)] ${
                            showSearch ? "hidden" : ""
                          }`}
                          alt="icon15"
                        />
                      </button>
                      <button
                        onClick={() => setShowSearch(false)}
                        className={`w-[58px] h-[58px] flex justify-center items-center flex-shrink-0 text-2xl text-[#6c757d] hover:text-[#d72027] ${
                          showSearch ? "" : "hidden"
                        }`}
                      >
                        X
                      </button>
                      <div
                        className={`${
                          showSearch ? "flex" : "hidden"
                        } absolute top-full left-0 right-0 h-[100vh] bg-[rgba(0,_0,_0,_.5)] z-10`}
                      >
                        <div className="p-2 bg-[#f8f9fa] w-full  h-[61px]">
                          <div className="container mx-auto max-w-[1200px]">
                            <div className="w-[400px] ml-auto relative ">
                              <form
                                onSubmit={handleKeyPress}
                                className="flex items-center space-x-1 [border:1px_solid_rgba(0,_0,_0,_.2)] rounded-[20px] pr-1"
                              >
                                <input
                                  placeholder="Tìm kiếm"
                                  type="text"
                                  className="w-full h-10 rounded-[20px] border-none outline-none pl-5 text-sm text-[#6c757d]"
                                  onChange={(e) =>
                                    setSearchValue(e.target.value)
                                  }
                                  value={searchValue}
                                />
                                <button
                                  type="submit"
                                  onClick={() => setShowSearch(false)}
                                  // This will submit the form when the "Enter" key is pressed
                                  className="bg-[#b40c0e] uppercase text-[13px] h-[34px] w-[90px] rounded-[20px] font-bold flex-shrink-0 flex justify-center items-center"
                                >
                                  Tìm kiếm
                                </button>
                              </form>
                              {/* <input
                                placeholder="Tìm kiếm"
                                type="text"
                                className="w-full h-10 rounded-[20px] border-none outline-none pl-5 text-sm text-[#6c757d]"
                                onChange={(e) => setSearchValue(e.target.value)}
                              />
                              <Link
                                href={`/tim-kiem/?search=${searchValue}&page=1`}
                                onClick={() => setShowSearch(false)}
                                className="bg-[#b40c0e] uppercase text-[13px] h-[34px] w-[90px] rounded-[20px] font-bold flex-shrink-0 flex items-center justify-center"
                              >
                                Tìm kiếm
                              </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          showSubMn();
                        }}
                        className="w-[43px] h-[43px] [border-left:1px_solid_#EBEBEB] [border-right:1px_solid_#EBEBEB] flex justify-center items-center flex-shrink-0 relative"
                      >
                        <Image
                          src={`/assets/images/icon16.png`}
                          width={16}
                          height={12}
                          className="object-contain"
                          alt="icon16"
                        />
                      </button>
                      <div className="showSubMn absolute top-0 right-0 left-0 p-14 pt-5 hidden justify-start bg-white">
                        <div className="container mx-auto max-w-[1200px]">
                          <button
                            onClick={() => {
                              showSubMn();
                            }}
                            className=""
                          >
                            <Image
                              src={`/assets/images/popup/Vector.png`}
                              width={20}
                              height={23}
                              className="object-contain"
                              alt="Vector"
                            />
                          </button>
                          <div className="mt-5 flex flex-wrap -mx-3 overflow-auto">
                            {menu.map((e, i) => {
                              return (
                                <Link
                                  onClick={() => {
                                    showSubMn();
                                  }}
                                  href={`/tin-tuc/${e.menu_slug}`}
                                  key={i}
                                  className={`flex flex-col mx-3 w-[calc(25%_-_24px)] mb-10 pb-10 [border-bottom:1px_solid_#D9D9D9] ${
                                    pathname.includes(e.menu_slug) ||
                                    e.child_menu?.filter((e) => {
                                      if (
                                        e.menu_slug &&
                                        pathName.includes(e.menu_slug)
                                      ) {
                                        return true;
                                      }
                                    }).length > 0
                                      ? "text-[#d72027] border-b-[1px] border-[#d72027]"
                                      : ""
                                  }`}
                                >
                                  <div className="text-2xl text-black font-bold">
                                    {e.menu_name}
                                  </div>
                                  {e.child_menu &&
                                    e.child_menu.map((ele, index) => {
                                      return (
                                        <Link
                                          href={`/${e.menu_slug}/${ele.menu_slug}`}
                                          className="text-xl text-[#3C3C3C]"
                                          key={index}
                                        >
                                          {ele.menu_name}
                                        </Link>
                                      );
                                    })}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </>
        )}
    </>
  );
};
export default Header;
