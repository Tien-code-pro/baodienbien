"use client";
import "./style.css";
import HTMLFlipBook from "react-pageflip";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Card, Drawer, Spin, TreeSelect } from "antd";
import { Article, ArticleNews } from "@/types/articleNews";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  getDetailArticle,
  getNewsByArticleType,
  getPaperByType,
} from "@/services/client-side/services-api/service1";
import NewspaperViewer from "./components/content-print-article";
const SpinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function BaoInView({
  slugRouter,
}: {
  slugRouter: string | undefined;
}) {
  const [detailArticle, setArticle] = useState<Article>();
  const [listArticle, setListArticle] = useState<ArticleNews[]>();

  const [valuePaperType, setValuePaperType] = useState<string>();
  const [optionsPaperType, setOptionsPaperType] = useState<Array<any>>();
  const [valuePaperNumber, setValuePaperNumber] = useState<any>();
  const [optionsPaperNumber, setOptionsPaperNumber] = useState<Array<any>>();
  const book = useRef();

  const [indexPage, setIndexPage] = useState<any>(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showNewspaperList = () => {
    setOpen(true);
  };
  const showNewspaperPage = () => {
    setOpen2(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    getDetailArticle(slugRouter || "").then((res) => {
      if (res.data.data && res.data.status > 0) {
        setArticle(res.data.data);
      }
    });
    getNewsByArticleType("bao-in", "", 0, -1).then((res) => {
      if (res.data.data && res.data.status > 0 && res.data.data.list) {
        setListArticle(res.data.data.list);
      }
    });

    getPaperByType().then((res) => {
      if (res.data.data && res.data.status > 0 && res.data.data.list) {
        var options = [] as any[];
        res.data.data.list.forEach((e) => {
          options.push({
            value: e.article_paper_type_id,
            title: e.paper_type_name,
          });
        });
        setOptionsPaperType(options);
      }
    });
  }, [slugRouter]);
  return (
    <>
      <div className="flex justify-between bg-[#ed1c24] text-[#fff] px-[10px] py-[15px]">
        <div>
          <a className="btn-back-to-homepage" href="/">
            ← Quay lại trang chủ
          </a>
          <button
            className="btn-menu js-btn-menu text-[#fff]"
            style={{ cursor: "pointer", marginLeft: 30 }}
            onClick={showNewspaperPage}
          >
            Mục lục
          </button>
        </div>

        <div className="hidden lg:block font-[16px] mr-[80px]">
          {detailArticle?.article_title}
        </div>
        <button
          className="btn-menu js-btn-menu"
          style={{ cursor: "pointer" }}
          onClick={showNewspaperList}
        >
          Danh sách báo in ▸
        </button>
      </div>
      {/* <Drawer
        title="Mục lục"
        width={250}
        closable={false}
        onClose={onClose2}
        open={open2}
        className={"left23"}
        placement={"left"}
      >
        {detailArticle ? (
          // @ts-ignore
          <>
            {detailArticle.list_file_info &&
              detailArticle.list_file_info.map((e, i) => {
                return (
                  <div
                    className={indexPage === i ? "active-drawer" : ""}
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "space-between",
                      backgroundColor: "#e8e8e8",
                      marginBottom: 20,
                      height: 40,
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 4,
                    }}
                    onClick={() => {
                      // @ts-ignore
                      book?.current?.pageFlip().turnToPage(i);
                      onClose2();
                      setIndexPage(i);
                    }}
                    key={i}
                  >
                    <div style={{}}>Trang {i + 1}</div>
                    <div>{i + 1}</div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            <Spin indicator={SpinIcon} />
          </>
        )}
      </Drawer> */}
      <Drawer
        title="Danh sách báo in"
        width={520}
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <button onClick={onClose}>tắt</button> */}
          <TreeSelect
            style={{
              width: "60%",
              scrollBehavior: "auto",
              scrollbarGutter: "unset",
              marginBottom: "20px",
            }}
            placeholder="Chọn ấn phẩm"
            showSearch
            treeData={optionsPaperType}
            onChange={(e) => {
              setValuePaperType(e);
            }}
            treeDefaultExpandAll
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            allowClear
            ref={useRef(null)}
            value={valuePaperType}
          ></TreeSelect>
          <TreeSelect
            style={{
              width: "37%",
              scrollBehavior: "auto",
              scrollbarGutter: "unset",
              marginBottom: "20px",
            }}
            placeholder="Ngày phát hành"
            showSearch
            treeData={optionsPaperNumber}
            onChange={(e) => {
              setValuePaperNumber(e);
              // router.push("/bao-in/" + e).then((r) => {
              //     setOpen(false);
              // });
              // @ts-ignore
              book?.current?.pageFlip().turnToPage(0);
            }}
            treeDefaultExpandAll
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            allowClear
            ref={useRef(null)}
            value={valuePaperNumber}
          ></TreeSelect>
        </div>

        {(listArticle || []).map((e) => {
          return (
            <>
              <Card style={{ marginBottom: "5px" }}>
                <Link
                  href={`/bao-in/doc-bao/${e.article_slug}`}
                  onClick={onClose}
                >
                  <img
                    src={e.avatar_image || ""}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Link>
              </Card>
            </>
          );
        })}
      </Drawer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        {detailArticle ? (
          // @ts-ignore
          <HTMLFlipBook
            width={600}
            height={800}
            showCover={true}
            startPage={0}
            startZIndex={0}
            ref={book}
          >
            {detailArticle.list_file_info &&
              detailArticle.list_file_info.map((e, i) => {
                return (
                  <div className="demoPage" key={i}>
                    <img src={e.file_url} alt="" width={600} height={800} />
                  </div>
                );
              })}
          </HTMLFlipBook>
        ) : (
          <>
            <Spin indicator={SpinIcon} />
          </>
        )}
      </div>
    </>
  );
}
