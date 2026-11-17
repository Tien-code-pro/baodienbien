"use client";
import SpinLoading from "@/components/common/Loading/spin-loading";
import { barlow, poppins } from "@/components/hooks/font";
import { getProvinceListApi } from "@/services/client-side/services-api/service1";
import { getWeather } from "@/services/client-side/services-api/serviceAnhht-api";
import { IProvince, IWeatherData } from "@/types/apiTypes";
import { formatDate } from "@/utils/helper";

import Image from "next/image";
import { useEffect, useState } from "react";
const DuBaoThoiTiet = () => {
  const [listProvince, setListProvince] = useState<IProvince[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>(21);
  const [weather, setWeather] = useState<IWeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const switchIconRender = (code: string) => {
    switch (code) {
      case "Thunderstorm":
        return "/assets/images/home/tstorms.png";
      case "Drizzle":
        return "/assets/images/home/chancesleet.png";
      case "Rain":
        return "/assets/images/home/chancerain.png";

      // case "Atmosphere":
      //   return "/assets/images/home/icon8.png";
      case "Clear":
        return "/assets/images/home/clear.png";
      case "Clouds":
        return "/assets/images/home/cloudy.png";
      default:
        return "";
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getProvinceListApi().then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setListProvince(res.data.data.list);
        const defaultProvince = res.data.data.list.find(
          (prov) => prov.id === 21
        );
        if (defaultProvince) {
          getWeather({
            lat: defaultProvince.latitude,
            lon: defaultProvince.longitute,
          }).then((resWeather) => {
            if (
              resWeather.data.status > 0 &&
              resWeather.data.data &&
              resWeather.data.data.list &&
              resWeather.data.data.list.length > 0
            ) {
              setWeather(resWeather.data.data.list);
            }
          });
        }
        setIsLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (listProvince && listProvince.length > 0) {
      const targetProvince = listProvince.find(
        (prov) => prov.id === selectedProvince
      );
      if (targetProvince) {
        getWeather({
          lat: targetProvince.latitude,
          lon: targetProvince.longitute,
        }).then((resWeather) => {
          if (
            resWeather.data.status > 0 &&
            resWeather.data.data &&
            resWeather.data.data.list &&
            resWeather.data.data.list.length > 0
          ) {
            setWeather(resWeather.data.data.list);
            setIsLoading(false);
          }
        });
      } else {
        setWeather([]);
        setIsLoading(false);
      }
    } else {
      setWeather([]);
      setIsLoading(false);
    }
  }, [selectedProvince]);
  return (
    <div className="flex flex-col bg-[#F5F7F9] pb-7 [border-top:1px_solid_#D62127] px-4">
      <div className="text-[#434343] font-semibold text-[22px] mt-4 mb-7">
        Thời tiết
      </div>
      <select
        name=""
        id=""
        onChange={(e) => {
          setSelectedProvince(parseInt(e.target.value));
        }}
        className={`h-[37px] w-full ${poppins.className} text-[#AEAEAE] pl-2 bg-white outline-none border-none`}
      >
        <option value="">Chọn tỉnh/ thành phố</option>
        {listProvince.map((province, idx) => (
          <option key={province.id} value={province.id}>
            {province.fullname}
          </option>
        ))}
      </select>
      <div className="flex justify-center items-center mt-4">
        {isLoading && <SpinLoading color="#D62127" width={20} height={20} />}
      </div>
      {weather.length > 0 && weather[0] && (
        <div className="flex justify-around my-5">
          <div className="">
            <Image
              src={switchIconRender(weather[0].weather[0].main)}
              width={74}
              height={67}
              className="object-contain "
              alt="icon9"
            />
          </div>
          <div className="flex flex-col">
            <div className={`text-sm ${barlow.className} text-[#A1A1A1]`}>
              {/* 05/08/2024 */}
              {weather[0] && formatDate(new Date(weather[0].dt * 1000))}
            </div>
            <div
              className={`my-2 text-[#3C3C3C] ${barlow.className} font-semibold`}
            >
              {weather[0] && weather[0].main.temp}°C
            </div>
            {/* <div className={` text-[#606060] ${barlow.className}`}>27C-35C</div> */}
          </div>
        </div>
      )}
      <div className="flex flex-col">
        {weather &&
          weather.length > 0 &&
          weather.map((e, i, a) => {
            if (i === 0) {
              return;
            }
            const date = new Date(e.dt * 1000);
            return (
              <div
                key={i}
                className={`[border-top:0.5px_solid_#BDBDBD] py-3 flex items-center justify-between`}
              >
                <div className={`${barlow.className} text-[#A8A8A8] text-sm`}>
                  {/* 06/08/2024 */}
                  {formatDate(date)}
                </div>
                <div className={`${barlow.className} text-[#383838] text-sm`}>
                  {/* 27C - 35C */}
                  {e.main.temp}°C
                </div>
                {/* `/assets/images/home/icon8.png` */}
                {/* `https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png` */}
                <div className="flex items-center justify-center w-[40px] h-[40px] ">
                  <Image
                    src={switchIconRender(e.weather[0].main)}
                    width={36}
                    height={36}
                    className="object-cover  "
                    alt="icon8"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default DuBaoThoiTiet;
