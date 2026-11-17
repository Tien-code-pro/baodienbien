import { ReactNode, useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Breadcrumbs,
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Image from "next/image";
const CusCollapse = (props: {
  className: string;
  text: ReactNode;
  title: string;
  icon: string;
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <div
        onClick={toggleOpen}
        className="flex items-center w-full h-full p-4 space-x-4 bg-[#F7F9FC] rounded-tl-[10px] rounded-tr-[10px]"
      >
        <Image
          width={32}
          height={32}
          src={`${props.icon}`}
          alt="trangtri"
          className={`object-contain w-1/12`}
        />
        <button className="text-[#E31E25] font-semibold w-10/12 text-left">
          {props.title}
        </button>
        <button className="w-1/12 flex items-center justify-end h-full ">
          <Image
            width={24}
            height={24}
            src={"/assets/images/gioithieu/icon5.png"}
            alt="trangtri"
            className={`${open ? "rotate-180" : "0"} object-contain`}
          />
        </button>
      </div>
      <Collapse open={open} className={props.className}>
        <div className="[border-bottom:0.25px_solid_#0E4D9C] w-full" />
        <div className="px-2 my-4">{props.text}</div>
      </Collapse>
    </>
  );
};
export default CusCollapse;
