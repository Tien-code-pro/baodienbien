"use client";
import useFont from "@/components/hooks/useFont";
import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClientMediaQuery } from "@/components/hooks/useClientMediaQuery";
import momenttz from "moment-timezone";
import {
  Article,
  ArticleMedia,
  ArticleNews,
  CategoryMenuResponse,
} from "@/types/articleNews";
import SpinLoading from "@/components/common/Loading/spin-loading";
import BlockMultimedia from "@/components/blockHome/BlockMultimedia";
import { getArticleFocalNewsApi } from "@/services/client-side/services-api/serviceTung-api";

export default function TamDiem() {
  const { mulish, barlow, poppins } = useFont();
  const isMobile = useClientMediaQuery("(max-width:768px");
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState<CategoryMenuResponse>();
  const [resultArticleMedia, setResultArticleMedia] = useState<ArticleMedia[]>(
    []
  );
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [resultArticleFocal, setResultArticleFocal] = useState<any[]>([]);
  // useEffect(() => {
  //   if (pageSize > 20) {
  //     setLoadingMore(true);
  //   } else {
  //     setLoading(true);
  //   }
  //   getArticlesByCategorySlugClient(category_slug, pageSize).then((res) => {
  //     if (
  //       res.data &&
  //       res.data.status > 0 &&
  //       res.data.data &&
  //       res.data.data.list
  //     ) {
  //       setData(res.data.data.list);
  //       setTotal(res.data.data.total || 0);
  //     }
  //     if (pageSize > 20) {
  //       setLoadingMore(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, [pageSize]);
  useEffect(() => {
    if (isClient) {
      if (pageSize > 20) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      getArticleFocalNewsApi({
        article_type: "",
        limit: pageSize,
      }).then((res) => {
        if (
          res.data.status > 0 &&
          res.data.data &&
          res.data.data.list &&
          res.data.data.list.length > 0
        ) {
          setResultArticleFocal(res.data.data.list);
          setTotal(res.data.data.total || 0);
          if (pageSize > 20) {
            setLoadingMore(false);
          } else {
            setLoading(false);
          }
        }
      });
    }
  }, [isClient, pageSize]);
  if (!isClient) return null;
  return (
    <>
      {/* pt-5 lg:pt-8 */}
      <section className={`  pb-5 px-4 2xl:px-0 ${mulish.className}`}>
        {isLoading ? (
          <div className="flex items-center justify-center m-4 mt-16">
            <SpinLoading color="#D62127" width={60} height={60} />
          </div>
        ) : (
          <>
            {resultArticleFocal && resultArticleFocal.length > 0 ? (
              <div className="">
                <div className="relative  py-5 lg:py-[35px] container mx-auto xl:max-w-[1200px] ">
                  <div className="bg-[#fff] absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-[-1]" />
                  <div className=" flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div
                      className={`text-[#212529] mx-auto ml-0 text-2xl lg:text-[30px] ${barlow.className} font-bold uppercase flex-shrink-0`}
                    >
                      <Link href={``}>Tâm điểm</Link>
                    </div>
                  </div>
                  {/* <hr className="[border-top:1px_solid_#CED1D8] my-6" /> */}
                  <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-[35px] lg:space-x-8">
                    {resultArticleFocal.length > 0 && (
                      <PageTypePC1
                        hrefL={`/${resultArticleFocal[0].article_type_slug}/${resultArticleFocal[0].category_slug}/${resultArticleFocal[0].article_slug}`}
                        time={true}
                        sizeImage={{ width: 335, height: 220 }}
                        classDiv={`flex flex-col w-full lg:w-[570px] flex-shrink-0`}
                        classImage={`object-cover w-full h-[220px] lg:h-[400px]`}
                        linkImage={resultArticleFocal[0].avatar_image}
                        classTitle="text-xl lg:text-[30px] leading-snug text-black lg:text-[#343a40] font-bold line-clamp-2 mt-2 lg:mt-5"
                        title={resultArticleFocal[0].article_title}
                        classTimeS={`block lg:hidden text-[#D62127] text-[11px] mt-4`}
                        timeS={momenttz(
                          momenttz.utc(resultArticleFocal[0].publish_date)
                        )
                          .tz("Asia/Bangkok")
                          .format("HH:mm DD/MM/YYYY")}
                        classDes={`text-[#303030] lg:text-[#303030] line-clamp-5 lg:line-clamp-3 mt-4`}
                        des={resultArticleFocal[0].article_sapo}
                        altImage={`img1`}
                      />
                    )}
                    <div className="mt-8 lg:mt-0 ">
                      <div className="flex flex-wrap -mx-3 ">
                        {resultArticleFocal.slice(1, 5).map((e, i) => {
                          return (
                            <PageTypePC2
                              hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                              key={i}
                              sizeImage={{ width: 150, height: 180 }}
                              icon={true}
                              classIcon={`object-contain absolute top-0.5 left-0 hidden lg:flex`}
                              classDiv={`flex flex-col mx-3 w-[calc(50%_-_24px)] mb-9`}
                              classText={`text-[#343a40] mt-3 lg:mt-4 line-clamp-3 text-base lg:text-[16px] relative font-medium lg:leading-[1.4] ${
                                e.article_type_slug !== "tin-bai" &&
                                "lg:indent-6"
                              } ${!isMobile ? poppins.className : ""}`}
                              srcIcon={e.article_type_slug}
                              classImage={`object-cover w-full h-[100px] lg:h-[180px]`}
                              linkImage={e.avatar_image || ""}
                              desText={e.article_title}
                              altImage={`img2`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {resultArticleFocal.length > 5 && (
                  <>
                    {/* <hr className="[border-top:1px_solid_#CED1D8]" /> */}
                    <div className="flex lg:space-x-4">
                      <div className="flex flex-col w-full ">
                        {/* {resultArticleFocal.slice(5, isMobile ? 23 : 15).map((e, i, arr) => { */}
                        {resultArticleFocal
                          .slice(5, pageSize)
                          .map((e, i, arr) => (
                            <>
                              {i === 6 && (
                                <div className="">
                                  <BlockMultimedia
                                    listArticleMedia={resultArticleMedia}
                                    className=""
                                  />
                                </div>
                              )}
                              <PageTypePC1
                                hrefL={`/${e.article_type_slug}/${e.category_slug}/${e.article_slug}`}
                                key={i}
                                time={true}
                                sizeImage={{ width: 150, height: 100 }}
                                classDiv={`container mx-auto xl:max-w-[1200px] flex items-center w-full py-5 [border-top:0.5px_solid_#D9D9D9] lg:border-t-0 ${
                                  i === arr.length - 1
                                    ? ""
                                    : "lg:[border-bottom:0.5px_solid_#D9D9D9]"
                                }`}
                                classImage={`object-cover w-[150px] h-[100px] lg:w-[270px] lg:h-[180px] mr-4 lg:mr-[30px]`}
                                linkImage={e.avatar_image || ""}
                                classTitle="text-[#343a40] line-clamp-4 lg:text-[#343a40] lg:text-[30px] lg:font-bold lg:line-clamp-2 leading-snug"
                                title={e.article_title}
                                classTimeS={`hidden lg:flex my-3 text-[#6c757d]`}
                                timeS={e.publish_date}
                                classDes={`hidden my-3 text-[#303030] text-[17px] lg:line-clamp-2`}
                                des={e.article_sapo}
                                altImage={`img1`}
                              />
                            </>
                          ))}
                      </div>
                    </div>
                  </>
                )}
                {total && resultArticleFocal && (
                  <>
                    {resultArticleFocal.length < total ? (
                      <button
                        onClick={() => setPageSize(pageSize + 10)}
                        className="mx-auto font-bold text-2xl w-[260px] h-[60px] bg-[#D62127] flex items-center justify-center mt-10 uppercase "
                      >
                        {isLoadingMore ? (
                          <SpinLoading color="#fff" width={40} height={40} />
                        ) : (
                          "Xem thêm"
                        )}
                      </button>
                    ) : (
                      <div className="text-center mt-5 text-gray-500">
                        Đã hiển thị tất cả.
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-black text-center mt-10">
                Chưa có bài viết thuộc chuyên mục.
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

// {
//   article_id: 219861,
//   article_slug: "phat-huy-vai-tro-nguoi-cao-tuoi-trong-giai-doan-moi",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/1DINHc303903_2024-11-29-04.jpg",
//   article_title: "Phát huy vai trò người cao tuổi trong giai đoạn mới",
//   article_sapo:
//     "Đồng chí Lê Thành Đô,    \n\nPhó Bí thư Tỉnh ủy, Chủ tịch UBND tỉnh",
//   article_type_slug: "tin-bai",
//   category_slug: "chinh-tri",
//   category_name: "Chính trị",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 0,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219854,
//   article_slug: "doan-dai-bieu-tinh-dien-bien-lam-viec-tai-lien-bang-nga",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/3213c30-330_2024-11-29-01.jpg",
//   article_title: "Đoàn đại biểu tỉnh Điện Biên làm việc tại Liên bang Nga",
//   article_sapo:
//     "ĐBP - Ngày 27/11, Đoàn công tác tỉnh Điện Biên do đồng chí Trần Quốc Cường, Ủy viên BCH Trung ương Đảng, Bí thư Tỉnh ủy làm trưởng đoàn đã có buổi làm việc với Đại sứ quán Việt Nam tại Liên bang Nga.",
//   article_type_slug: "tin-bai",
//   category_slug: "doi-ngoai",
//   category_name: "Đối ngoại",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 1,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219836,
//   article_slug: "canh-tay-noi-dai-cua-luc-luong-cong-an",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/IMG6778ch3839389_2024-11-28-35.jpg",
//   article_title: "Cánh tay nối dài của lực lượng công an",
//   article_sapo:
//     "Ngày 1/7/2024 đã trở thành dấu mốc quan trọng, đánh dấu sự ra đời của tổ bảo vệ an ninh, trật tự ở cơ sở - một lực lượng mới do chính quyền địa phương thành lập trên cơ sở tự nguyện của nhân dân. ",
//   article_type_slug: "tin-bai",
//   category_slug: "an-ninh-trat-tu",
//   category_name: "An ninh trật tự",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 2,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219834,
//   article_slug: "du-lich-muong-cha-tiem-nang-con-bo-ngo",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/IMG9778c33303_2024-11-28-06.jpg",
//   article_title: "Du lịch Mường Chà: Tiềm năng còn bỏ ngỏ",
//   article_sapo:
//     "Hệ thống hang động, điểm dừng chân check-in, mô hình du lịch cộng đồng… là những lợi thế, tiềm năng để phát triển du lịch văn hóa, du lịch sinh thái của huyện Mường Chà. Tuy nhiên những năm qua, tiềm năng du lịch nơi đây mới chỉ dừng ở việc định hướng mà chưa được “đánh thức”.",
//   article_type_slug: "tin-bai",
//   category_slug: "du-lich",
//   category_name: "Du lịch",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 3,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219833,
//   article_slug:
//     "dien-bien-tham-gia-hoi-cho-cong-thuong-khu-vuc-dong-bac-thai-nguyen",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/9752c3-3_2024-11-28-23.jpg",
//   article_title:
//     "Điện Biên tham gia hội chợ Công Thương khu vực Đông Bắc - Thái Nguyên",
//   article_sapo:
//     "ĐBP - Từ ngày 28/11 - 1/12, tỉnh Điện Biên tham gia 2 gian hàng tại hội chợ Công Thương khu vực Đông Bắc - Thái Nguyên năm 2024.",
//   article_type_slug: "tin-bai",
//   category_slug: "kinh-te",
//   category_name: "Kinh tế",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 4,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219830,
//   article_slug: "ho-tro-kinh-phi-lam-nha-dai-doan-ket-tai-muong-ang",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/DSC0070c3303_2024-11-28-40.jpg",
//   article_title: "Hỗ trợ kinh phí làm nhà đại đoàn kết tại Mường Ảng",
//   article_sapo:
//     "ĐBP - Ngày 28/11, Ủy ban Mặt trận Tổ quốc Việt Nam tỉnh đã tổ chức trao kinh phí hỗ trợ làm nhà đại đoàn kết cho 2 hộ gia đình hoàn cảnh đặc biệt khó khăn trên địa bàn huyện Mường Ảng.",
//   article_type_slug: "tin-bai",
//   category_slug: "xa-hoi",
//   category_name: "Xã hội",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 5,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219808,
//   article_slug:
//     "hiep-thuong-ke-hoach-giam-sat-cua-uy-ban-mttq-va-cac-to-chuc-chinh-tri-xa-hoi",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/IMG0311cj300393_2024-11-27-40.jpg",
//   article_title:
//     "Hiệp thương kế hoạch giám sát của Ủy ban MTTQ và các tổ chức chính trị - xã hội",
//   article_sapo:
//     "ĐBP - Chiều nay (27/11), Ban Thường trực Ủy ban MTTQ Việt Nam tỉnh tổ chức hội nghị hiệp thương kế hoạch giám sát của Ủy ban MTTQ Việt Nam và các tổ chính trị - xã hội tỉnh năm 2025.",
//   article_type_slug: "tin-bai",
//   category_slug: "chinh-tri",
//   category_name: "Chính trị",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 6,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219811,
//   article_slug: "cong-an-tp-dien-bien-phu-lang-nghe-y-kien-nhan-dan",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/IMG5033c339_2024-11-27-28.jpg",
//   article_title: "Công an TP. Điện Biên Phủ lắng nghe ý kiến nhân dân",
//   article_sapo:
//     "ĐBP - Hội nghị “Công an lắng nghe ý kiến nhân dân” năm 2024 do Công an TP. Điện Biên Phủ phối hợp với Ủy ban MTTQ Việt Nam thành phố tổ chức sáng 27/11.",
//   article_type_slug: "tin-bai",
//   category_slug: "xa-hoi",
//   category_name: "Xã hội",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 7,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219812,
//   article_slug: "ho-tro-xay-dung-bep-an-ban-tru-cho-hoc-sinh-muong-cha",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/anh-3ch3989393_2024-11-27-11.jpg",
//   article_title: "Hỗ trợ xây dựng bếp ăn bán trú cho học sinh Mường Chà",
//   article_sapo:
//     "ĐBP - Ngày 27/11, Công đoàn Viên chức tỉnh phối hợp với Công đoàn Khối thi đua số 7 (CĐVC Việt Nam) tổ chức khánh thành bếp ăn bán trú cho học sinh Trường PTDTBT Tiểu học Ma Thì Hồ, huyện Mường Chà.",
//   article_type_slug: "tin-bai",
//   category_slug: "xa-hoi",
//   category_name: "Xã hội",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 8,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219823,
//   article_slug: "de-moi-tre-em-deu-duoc-den-truong",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/IMG4112c3330_2024-11-28-59.jpg",
//   article_title: "Để mọi trẻ em đều được đến trường",
//   article_sapo:
//     "ĐBP - Với tinh thần “Tương thân, tương ái” vì học sinh vùng cao Điện Biên, năm học 2024 - 2025, các cấp, ngành, cơ quan, đơn vị, doanh nghiệp, các tổ chức xã hội trong và ngoài tỉnh đã chung tay chăm lo, hỗ trợ học sinh tiếp bước tới trường. Sự quan tâm, hỗ trợ đã giúp học sinh vùng cao có bữa ăn ngon, quần áo đẹp, chăn ấm, đệm êm và đầy đủ sách vở, đồ dùng học tập… yên tâm đến trường.",
//   article_type_slug: "tin-bai",
//   category_slug: "giao-duc",
//   category_name: "Giáo dục",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 9,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219828,
//   article_slug:
//     "di-tich-quoc-gia-dac-biet-chien-truong-dien-bien-phu-bo-sung-1-di-tich-thanh-phan",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/2311c0339390_2024-11-28-57.jpg",
//   article_title:
//     "Di tích quốc gia đặc biệt chiến trường Điện Biên Phủ bổ sung 1 di tích thành phần",
//   article_sapo:
//     "ĐBP - Thủ tướng Chính phủ vừa ký quyết định về việc xếp hạng di tích quốc gia đặc biệt (đợt 16, năm 2024), cả nước bổ sung 6 di tích được xếp hạng di tích quốc gia đặc biệt. Trong đó, tỉnh Điện Biên bổ sung 1 di tích trận địa pháo 105mm của Đại đội 805 (trên địa bàn TP. Điện Biên Phủ và huyện Điện Biên) vào Di tích quốc gia đặc biệt chiến trường Điện Biên Phủ.",
//   article_type_slug: "tin-bai",
//   category_slug: "van-hoa",
//   category_name: "Văn hoá",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 10,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
// {
//   article_id: 219840,
//   article_slug:
//     "sua-doi-bo-sung-quy-dinh-ve-mo-nganh-dao-tao-trinh-do-dai-hoc-thac-si-tien-si",
//   avatar_image:
//     "https://media-dienbien.vtcplay.vn/cdnmediabaotintucvn-upload-gyjxhsn6vbcjnsv7rj8xyq-files-2020-10-13102020tiensi_2024-11-28-52.jpg",
//   article_title:
//     "Sửa đổi, bổ sung quy định về mở ngành đào tạo trình độ đại học, thạc sĩ, tiến sĩ",
//   article_sapo:
//     "Bộ Giáo dục và Đào tạo vừa ban hành Thông tư 16/2024/TT-BGDĐT sửa đổi, bổ sung một số điều của Thông tư 02/2022/TT-BGDĐT quy định điều kiện, trình tự, thủ tục mở ngành đào tạo, đình chỉ hoạt động của ngành đào tạo trình độ đại học, thạc sĩ, tiến sĩ.",
//   article_type_slug: "tin-bai",
//   category_slug: "giao-duc",
//   category_name: "Giáo dục",
//   is_multi_media: null,
//   is_speech: null,
//   article_status_id: null,
//   outstanding: 2,
//   is_selected: 1,
//   order_position: 11,
//   view_count: 0,
//   category_id: null,
//   parent_id: null,
//   publish_date: null,
//   leak_url: null,
//   list_file_info: null,
//   live_status: 0,
// },
