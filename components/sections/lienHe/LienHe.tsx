"use client";
import useFont from "@/components/hooks/useFont";
import { RootState } from "@/redux/configure-store";
import { useAppSelector } from "@/redux/hooks";
import { postSendFeedback } from "@/services/client-side/auth/auth.api";
import { getListDepartment } from "@/services/client-side/services-api/service-api-tu";

import Link from "next/link";
import React, { useEffect, useState } from "react";
interface IFormData {
  fullname: string;
  email: string;
  title: string;
  content: string;
  editorialBoard: string;
}
interface dataOptions {
  label: string;
  value: number;
}
const regexEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const LienHe = () => {
  const { mulish, barlow, poppins } = useFont();
  const [errors, setErrors] = useState<Partial<IFormData>>({});
  const [listEditorialBoard, setListEditorialBoard] = useState<dataOptions[]>();
  const [isStatusRespon, setStatusSuccess] = useState<number>(0);
  const { accountName, emailRegister } = useAppSelector(
    (state: RootState) => state.app
  );
  const [formData, setFormData] = useState<IFormData>({
    fullname: "",
    email: "",
    title: "",
    content: "",
    editorialBoard: "",
  });
  useEffect(() => {
    getListDepartment({ _department_name: "", offset: 0, limit: -1 }).then(
      (res) => {
        if (res && res.data && res.data.status > 0) {
          const dataDepartment =
            res.data.data && res.data.data.list && res.data.data.list.length > 0
              ? res.data.data.list.map((e) => ({
                  label: String(e.department_name),
                  value: Number(e.department_id),
                }))
              : [{ label: "Không có data", value: -1 }];
          dataDepartment && setListEditorialBoard(dataDepartment);
        }
      }
    );
  }, []);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // validate();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validate = () => {
    let tempErrors: Partial<IFormData> = {};
    // if (!formData.fullname)
    //   tempErrors.fullname = "Họ và tên không được bỏ trống!";
    if (!formData.title) tempErrors.title = "Tiêu đề không được bỏ trống!";
    if (!formData.editorialBoard)
      tempErrors.editorialBoard = "Bạn chưa chọn gửi tới đâu";
    if (!formData.content) tempErrors.content = "Nội dung không được bỏ trống!";
    // if (!formData.email) {
    //   tempErrors.email = "Số điện thoại không được bỏ trống!";
    // } else if (!regexEmail.test(formData.email)) {
    //   tempErrors.email = "Email không hợp lệ";
    // }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmitForm = () => {
    const isValid = validate();
    if (isValid) {
      postSendFeedback({
        title: formData.title,
        content: formData.content,
        department_id: Number(formData.editorialBoard),
      })
        .then((res) => {
          if (res && res.data && res.data) {
            setStatusSuccess(1);
          } else {
            setStatusSuccess(-1);
          }
        })
        .catch((error) => {
          setStatusSuccess(-1);
          // if (error.response && error.response.status === 400) {
          //   setStatusSuccess(-1);
          // } else {
          //   setStatusSuccess(-1);
          // }
        });
    }
  };

  return (
    <>
      <section className={`px-4 2xl:px-0 ${mulish.className} py-10`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          <div
            className={`font-bold text-2xl lg:text-[30px] ${barlow.className} text-[#212529] uppercase`}
          >
            Liên hệ tòa soạn
          </div>
          <hr className={`[border-top:1px_solid_#CED1D8] my-6`} />
          <div className="flex flex-col">
            <div className="flex flex-col mb-6">
              <div
                className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
              >
                Họ tên
              </div>
              <input
                disabled
                value={accountName}
                name="fullname"
                onChange={handleChange}
                type="text"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errors.fullname
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                } pl-4 lg:pl-7 lg:text-[18px] text-[#979797] h-12 `}
                placeholder="Họ và tên"
              />
              {errors.fullname && (
                <p className="italic text-red-500">{errors.fullname}</p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-10 mb-6">
              <div className="flex flex-col lg:w-1/2 mb-6 lg:mb-0">
                <div
                  className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
                >
                  Email
                </div>
                <input
                  disabled
                  value={emailRegister}
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                    errors.email
                      ? "[border:1px_solid_#F44336]"
                      : "[border:1px_solid_#D8D8D8]"
                  } pl-4 lg:pl-7 lg:text-[18px] text-[#979797] h-12 `}
                  placeholder="Nhập mail"
                />
                {errors.email && (
                  <p className="italic text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col lg:w-1/2">
                <div
                  className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
                >
                  Gửi tới
                </div>

                <select
                  defaultValue={""}
                  name="editorialBoard"
                  onChange={handleChange}
                  className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                    errors.editorialBoard
                      ? "[border:1px_solid_#F44336]"
                      : "[border:1px_solid_#D8D8D8]"
                  } pl-4 lg:pl-7 lg:text-[18px] text-[#979797] h-12 `}
                >
                  <option className="hidden" value="" disabled selected>
                    Gửi tới
                  </option>
                  {listEditorialBoard &&
                    listEditorialBoard.length > 0 &&
                    listEditorialBoard?.map((e, i) => (
                      <option key={i} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                </select>
                {errors.editorialBoard && (
                  <p className="italic text-red-500">{errors.editorialBoard}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div
                className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
              >
                Tiêu đề
              </div>
              <input
                name="title"
                onChange={handleChange}
                type="text"
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errors.title
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                } pl-4 lg:pl-7 lg:text-[18px] text-[#979797] h-12 `}
                placeholder="Tiêu đề"
              />
              {errors.title && (
                <p className="italic text-red-500">{errors.title}</p>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <div
                className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
              >
                Nội dung
              </div>
              <textarea
                name="content"
                onChange={handleChange}
                className={`w-full outline-none hover:border-blue-300 focus:outline-blue-500 outline-offset-0 ${
                  errors.content
                    ? "[border:1px_solid_#F44336]"
                    : "[border:1px_solid_#D8D8D8]"
                } pl-4 lg:pl-7 lg:text-[18px] text-[#979797] min-h-[200px] `}
                placeholder=""
              />
              {errors.content && (
                <p className="italic text-red-500">{errors.content}</p>
              )}
            </div>
            <div className="flex flex-col mb-6">
              {/* <div
                className={`text-[#212529] ${barlow.className} text-2xl mb-3`}
              >
                File đính kèm{" "}
                <strong className={`text-[#909090] font-normal text-[18px]`}>
                  (không bắt buộc)
                </strong>
              </div> */}
              {/* <label
                htmlFor="upfile"
                className="[border:1px_solid_#D8D8D8] text-[#979797] h-[250px] flex items-center justify-center flex-col px-4 cursor-pointer"
              >
                <input type="file" name="" id="upfile" className="hidden " />
                <Image
                  src={`/assets/images/lienhe/align-down-02.png`}
                  width={48}
                  height={48}
                  className="object-contain"
                  alt="align-down-02"
                />
                <div
                  className={`mt-8 lg:text-[18px] text-[#8B8B8B] ${poppins.className} text-center`}
                >
                  Kéo thả tập tin vào đây hoặc chọn tập tin để tải lên
                </div>
              </label> */}
              <div
                className={`mt-8 text-[18px] text-[#8B8B8B] ${poppins.className} `}
              >
                Bạn bấm gửi là đồng ý với{" "}
                <Link
                  href={``}
                  className="text-[#2070E8] font-normal underline"
                >
                  điều khoản sử dụng
                </Link>{" "}
                của chúng tôi
              </div>

              <p
                className={`italic ${
                  isStatusRespon === -1 ? "text-red-500 " : "text-green-500 "
                } mt-8 mb-2`}
              >
                {isStatusRespon === -1 && "Gửi phản hồi thất bại"}
                {isStatusRespon === 1 && "Gửi phản hồi thành công"}
              </p>

              {isStatusRespon === 2 && (
                <p className="italic text-red-500 mt-8 mb-2">Gửi lỗi</p>
              )}

              <button
                onClick={handleSubmitForm}
                className={` text-[18px] w-[200px] h-[51px] bg-[#D62127] ${poppins.className}`}
              >
                Gửi{" "}
              </button>
              <div />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LienHe;
