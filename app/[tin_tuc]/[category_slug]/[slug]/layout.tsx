"use client";
import React, { useEffect, useState } from "react";
import Fancybox from "./_components/FancyBox";
import Image from "next/image";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<string[]>([]);
  //   Handle click on image in normal/emagazine articles to show FancyBox Images
  useEffect(() => {
    const imageElements = document.querySelectorAll("figure>img");
    const imageUrls = Array.from(imageElements).map((img) => {
      const image = img as HTMLImageElement;
      return image.src;
    });

    setImages(imageUrls);
    const handleClick = (id: number) => {
      console.log(id, "clicked");
      const imageClicked = document.getElementById(`gallery-${id}`);
      console.log(imageClicked);
      if (imageClicked) {
        imageClicked.click();
      }
    };

    imageElements.forEach((img, idx) => {
      img.addEventListener("click", () => handleClick(idx));
    });

    return () => {
      imageElements.forEach((img, idx) => {
        img.removeEventListener("click", () => handleClick(idx));
      });
    };
  }, []);
  return (
    <div>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        {images.length > 0 &&
          images.map((src, index) => (
            <div key={index}>
              <a
                data-fancybox="gallery"
                id={`gallery-${index}`}
                href={src}
                className={`hidden `}
              >
                <Image src={src} width={400} height={200} alt="" />
              </a>
            </div>
          ))}
      </Fancybox>

      {children}
    </div>
  );
};

export default Layout;
