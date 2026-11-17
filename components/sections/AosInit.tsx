"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const AosInit = () => {
  useEffect(() => {
    AOS.init({ offset: 20, duration: 1000 });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);
  return <></>;
};
export default AosInit;
