"use client";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

interface Page {
  file_url: string;
}

interface Props {
  pages: Page[];
}

export default function NewspaperViewer({ pages }: Props) {
  return (
    <div className="w-full h-[100%] bg-[#222] flex justify-center">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={3}
        initialPositionX={200}
        initialPositionY={100}
        wheel={{ step: 0.1 }}
        doubleClick={{ mode: "zoomIn" }}
        pinch={{ step: 5 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* TOOLBAR */}
            <div className="fixed top-4 z-10 flex gap-2 bg-black/60 p-2 rounded">
              <button onClick={() => zoomIn()}>➕</button>
              <button onClick={() => zoomOut()}>➖</button>
              <button onClick={() => resetTransform()}>🔄</button>
            </div>

            {/* CONTENT */}
            <TransformComponent>
              <div className="flex flex-col items-center gap-10 py-10">
                {pages.map((p, i) => (
                  <img
                    key={i}
                    src={p.file_url}
                    alt=""
                    className="w-[800px] max-w-full shadow-xl bg-white"
                    draggable={false}
                  />
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
