"use client";

import Script from "next/script";
import { useRef } from "react";

interface Page {
  file_url: string;
}

interface Props {
  pages: Page[];
}

export default function TurnBook({ pages }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);

  const initTurn = () => {
    const win = window as any;
    if (!win.$ || !win.$.fn || !win.$.fn.turn || !bookRef.current) {
      console.error("Turn.js or jQuery not ready");
      return;
    }

    win.$(bookRef.current).turn({
      width: 1120,
      height: 840,
      display: "double",
      autoCenter: true,
      elevation: 50,
      gradients: true,
      duration: 800,
    });
  };

  return (
    <>
      {/* jQuery LOCAL – PHẢI LOAD TRƯỚC */}
      <Script src="/libs/jquery-3.7.1.min.js" strategy="beforeInteractive" />

      {/* Turn.js CDN – INIT SAU KHI LOAD XONG */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/turn.js/3/turn.min.js"
        strategy="afterInteractive"
        onLoad={initTurn}
      />

      <div className="w-full h-screen bg-[#222] flex justify-center items-center overflow-hidden">
        <div ref={bookRef} id="book" style={{ width: 1120, height: 840 }}>
          {pages.map((p, i) => (
            <div key={i} className="page">
              <img src={p.file_url} draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* CSS BẮT BUỘC */}
      <style jsx global>{`
        #book {
          background: #fff;
        }

        .page {
          width: 560px;
          height: 840px;
          background: white;
        }

        .page img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
        }
      `}</style>
    </>
  );
}
