"use client";
import appSlice from "@/app/appSlice";
import useFont from "@/components/hooks/useFont";
import DangNhap from "@/components/modals/DangNhap";

import { RootState } from "@/redux/configure-store";
import {
  getCommentArticle,
  handleCommentArticle,
  handleLikeComment,
  handleReplyCommentArticle,
} from "@/services/client-side/services-api/serviceTung-api";
import { CommentType } from "@/types/category";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface P {
  slug: string;
  isComment: number;
}

export default function BinhLuan(props: P) {
  const { slug, isComment } = props;
  const { mulish } = useFont();
  const { barlow } = useFont();
  const { poppins } = useFont();
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const dispatch = useDispatch();
  const { updateModalState } = appSlice.actions;
  const [active, setActive] = useState<1 | 2>(1);
  const [list, setList] = useState<CommentType[]>([]);
  const [openComment, setOpenComment] = useState(new Set());
  const [answer, setAnswer] = useState(0);
  const [comment, setComment] = useState("");
  const [answerCm, setAnswerCm] = useState("");
  const swithActive = (id: 1 | 2) => {
    setActive(id);
  };
  useEffect(() => {
    getCommentArticle({
      article_slug: slug,
      offset: 0,
      limit: 5,
      type: active,
    }).then((res) => {
      if (res && res.data && res.data.status > 0 && res.data.data) {
        setList(res.data.data.list);
      }
    });
  }, [active]);
  return (
    <>
      <section className={`${mulish.className} pt-8`}>
        <div className="container mx-auto xl:max-w-[1200px]">
          {isComment === 1 && (
            <div className="mt-8 px-4 2xl:px-0 pb-9">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex-shrink-0 text-[30px] text-[#212529] ${barlow.className} font-bold uppercase`}
                >
                  Bình Luận
                </div>
                <hr className="border-[#CED1D8] w-full" />
              </div>
              <div className="mt-6 flex flex-col justify-end">
                <textarea
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  name=""
                  id=""
                  placeholder="Nhập nội dung bình luận..."
                  className={`pt-5 pl-3 w-full min-h-[150px] outline-none [border:0.5px_solid_#E2E2E2] text-sm text-[#8B8B8B] placeholder:text-[#8B8B8B] ${poppins.className}`}
                ></textarea>
                <button
                  className={`${poppins.className} text-[18px] flex items-center justify-center bg-[#D62127] h-[51px] w-[200px] mt-6 ml-auto`}
                  onClick={() => {
                    if (isLogin) {
                      handleCommentArticle({
                        article_slug: slug,
                        content_comment: comment,
                      });
                    } else {
                      dispatch(updateModalState(<DangNhap />));
                    }
                  }}
                >
                  Gửi bình luận
                </button>
              </div>
              <div className="flex flex-col">
                <div className="[border-top:1px_solid_#d9d9d9] [border-bottom:1px_solid_#d9d9d9] my-5 py-5 flex items-center justify-between">
                  <div className="text-black">(4) Bình luận</div>
                  <div className="text-black flex items-center">
                    Xếp theo:{" "}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          swithActive(1);
                        }}
                        className={`${active === 1 ? "font-extrabold" : ""}`}
                      >
                        Thời gian
                      </button>
                      /
                      <button
                        onClick={() => {
                          swithActive(2);
                        }}
                        className={`${active === 2 ? "font-extrabold" : ""}`}
                      >
                        Quan tâm
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  {list.length > 0 &&
                    list.map((e, i) => {
                      return (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-[50%] flex-shrink-0">
                            <Image
                              src={"/assets/images/movtop.png"}
                              alt="Avata"
                              className="w-full h-full object-cover rounded-[50%]"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="font-bold text-black leading-none">
                              {e.parrent_comment.user_name}
                            </div>
                            <div className="text-black my-3">
                              {e.parrent_comment.content}
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="flex items-center text-black">
                                <img
                                  src={"/assets/images/icon_like.png"}
                                  alt="icon_like"
                                  className="object-contain mr-3 cursor-pointer"
                                  width={17}
                                  height={17}
                                  onClick={() => {
                                    if (isLogin) {
                                      handleLikeComment({
                                        article_slug: slug,
                                        comment_id:
                                          e.parrent_comment.comment_id,
                                        parent_id: e.parrent_comment.parent_id,
                                        like: 1,
                                      });
                                    } else {
                                      dispatch(updateModalState(<DangNhap />));
                                    }
                                  }}
                                />
                                {e.parrent_comment.likeAccount.length}
                              </div>
                              <button
                                className="text-black"
                                onClick={() => {
                                  setOpenComment(
                                    openComment.add(
                                      e.parrent_comment.account_id
                                    )
                                  );
                                  setAnswer(e.parrent_comment.account_id);
                                  setAnswerCm("");
                                }}
                              >
                                Trả lời
                              </button>
                              <div className="text-sm text-[rgb(117,_117,_117)]">
                                {e.parrent_comment.created_date_format}
                              </div>
                            </div>
                            {e.child_comment.length > 0 &&
                              !openComment.has(
                                e.parrent_comment.account_id
                              ) && (
                                <button className="flex items-center  mt-2 space-x-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="11"
                                    viewBox="0 0 14 11"
                                    fill="none"
                                  >
                                    <path
                                      d="M10.6899 5.00504L8.43409 2.7493C8.14119 2.45641 8.14119 1.98153 8.43409 1.68864C8.70035 1.42237 9.11702 1.39817 9.41063 1.61602L9.49475 1.68864L13.0303 5.22417L13.0988 5.30297L13.1394 5.36234L13.1885 5.45661L13.2213 5.54841L13.2372 5.61622L13.2461 5.6781L13.2498 5.77172L13.2461 5.83091L13.2305 5.92486L13.2 6.02413L13.1536 6.12268L13.1188 6.17837C13.0932 6.21576 13.0636 6.25148 13.0303 6.28484L13.0988 6.20604C13.0778 6.23388 13.0549 6.26021 13.0303 6.28484L9.49475 9.82037C9.20185 10.1133 8.72698 10.1133 8.43409 9.82037C8.16782 9.5541 8.14361 9.13744 8.36147 8.84383L8.43409 8.75971L10.6899 6.50504L6.99995 6.50451C3.34847 6.50451 0.867431 4.42787 0.754008 1.46745L0.749949 1.25451C0.749949 0.840292 1.08574 0.504505 1.49995 0.504505C1.91416 0.504505 2.24995 0.840292 2.24995 1.25451C2.24995 3.38337 3.94196 4.91239 6.74233 5.00049L6.99995 5.00451L10.6899 5.00504L8.43409 2.7493L10.6899 5.00504Z"
                                      fill="#757575"
                                    />
                                  </svg>
                                  <div
                                    className="text-[#757575] text-sm"
                                    onClick={() =>
                                      setOpenComment(
                                        openComment.add(
                                          e.parrent_comment.account_id
                                        )
                                      )
                                    }
                                  >
                                    {" "}
                                    {e.child_comment.length} trả lời
                                  </div>
                                </button>
                              )}

                            <div className="mt-5 [border-left:2px_solid_#E5E5E5] pl-5 flex flex-col">
                              {answer &&
                                e.parrent_comment.account_id === answer && (
                                  <div className="mb-5">
                                    <textarea
                                      name=""
                                      id=""
                                      placeholder="Vui lòng nhập tiếng việt có dấu"
                                      value={answerCm}
                                      onChange={(e) => {
                                        setAnswerCm(e.target.value);
                                      }}
                                      className="rounded-lg [border:1px_solid_#d9d9d9] outline-none p-4 text-[#858585] placeholder:text-[#858585] w-full min-h-[105px]"
                                    ></textarea>
                                    <div className="mt-3 flex justify-start items-center space-x-3">
                                      <button
                                        onClick={() => {
                                          if (isLogin) {
                                            handleReplyCommentArticle({
                                              article_slug: slug,
                                              comment_id:
                                                e.parrent_comment.comment_id,
                                              content_comment: answerCm,
                                            });
                                          } else {
                                            dispatch(
                                              updateModalState(<DangNhap />)
                                            );
                                          }
                                        }}
                                        className="h-[45px] rounded bg-[#645151] flex items-center justify-center font-medium px-2 text-sm min-w-[100px]"
                                      >
                                        Gửi bình luận
                                      </button>
                                      <button
                                        onClick={() => {
                                          setAnswer(0);
                                        }}
                                        className="h-[45px] rounded bg-[rgb(64,_81,_137)] flex items-center justify-center font-medium px-2 text-sm min-w-[100px]"
                                      >
                                        Hủy
                                      </button>
                                    </div>
                                  </div>
                                )}
                              {e.child_comment.length > 0 &&
                                openComment.has(e.parrent_comment.account_id) &&
                                e.child_comment.map((ele, index) => {
                                  return (
                                    <div
                                      className="flex items-start space-x-3"
                                      key={index}
                                    >
                                      <div className="w-10 h-10 rounded-[50%] flex-shrink-0">
                                        <Image
                                          src={"/assets/images/movtop.png"}
                                          alt="Avata"
                                          className="w-full h-full object-cover rounded-[50%]"
                                          width={40}
                                          height={40}
                                        />
                                      </div>
                                      <div className="flex flex-col w-full">
                                        <div className="font-bold text-black leading-none">
                                          {ele.user_name}
                                        </div>
                                        <div className="text-black my-3">
                                          {ele.content}
                                        </div>
                                        <div className="flex items-center space-x-8">
                                          <div className="flex items-center text-black">
                                            <img
                                              src={
                                                "/assets/images/icon_like.png"
                                              }
                                              alt="icon_like"
                                              className="object-contain mr-3 cursor-pointer"
                                              width={17}
                                              height={17}
                                              onClick={() => {
                                                handleLikeComment({
                                                  article_slug: slug,
                                                  comment_id: ele.comment_id,
                                                  parent_id: ele.parent_id,
                                                  like: 1,
                                                });
                                              }}
                                            />
                                            {ele.likeAccount.length}
                                          </div>
                                          {/* <button className="text-black">
                                          Trả lời
                                        </button> */}
                                          <div className="text-sm text-[rgb(117,_117,_117)]">
                                            {ele.created_date_format}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {/* Binh luan */}
        </div>
      </section>
    </>
  );
}
