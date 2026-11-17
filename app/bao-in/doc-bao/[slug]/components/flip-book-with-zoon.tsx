"use client";

import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { Document, Page } from "react-pdf";
interface Page {
  file_url: string;
}
interface Props {
  pages: Page[];
}
const FlipbookWithZoom = ({ pages }: Props) => {
  const bookRef = useRef<any>(null);

  return (
    // <div className="w-full h-full flex flex-col items-center">
    // <TransformWrapper
    //   initialScale={0.8}
    //   minScale={0.5}
    //   maxScale={3}
    //   wheel={{ step: 0.1 }}
    // >
    <>
      {/* {({ zoomIn, zoomOut, resetTransform }) => ( */}
      <>
        {/* <div className="flex gap-3 mb-4">
              <button onClick={() => zoomIn()}>➕</button>
              <button onClick={() => zoomOut()}>➖</button>
              <button onClick={() => resetTransform()}>🔄</button>
            </div> */}

        {/* <TransformComponent> */}
        {pages ? (
          //@ts-ignore
          <HTMLFlipBook
            width={600}
            height={800}
            showCover={true}
            startPage={0}
            startZIndex={0}
            ref={bookRef}
          >
            {pages.map((e, i) => {
              return (
                <div className="demoPage" key={i}>
                  <img src={e.file_url} alt="" width={600} height={800} />
                </div>
              );
            })}
          </HTMLFlipBook>
        ) : (
          // <NewspaperViewer pages={detailArticle.list_file_info || []} />
          <></>
        )}
        {/* </TransformComponent> */}
      </>
      {/* )} */}
    </>
    // </TransformWrapper>
    // </div>
  );
};

export default FlipbookWithZoom;
