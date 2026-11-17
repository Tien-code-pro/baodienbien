import { PagingParam } from "@/types/paramTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
interface P {
  apiCall: any;
  onUpdateData: (e: any) => void;
  activeClass: string;
  normalClass: string;
  ulClass: string;
  liClass: string;
  jumpClass: string;
  pagesize?: number;
  param?: any;
}
const PagingType2 = (props: P) => {
  const {
    apiCall,
    onUpdateData,
    activeClass,
    normalClass,
    ulClass,
    liClass,
    jumpClass,
    pagesize,
    param,
  } = props;
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [arr, setArr] = useState<number[]>([]);
  const pageSize = pagesize ? pagesize : 10;
  // useEffect(() => {
  //   const data: PagingParam = {
  //     pageNum,
  //     pageSize,
  //   };
  //   apiCall({ ...data, ...param }).then((res: any) => {
  //     if (res && res.data.code > 0) {
  //       onUpdateData(res.data.data.list);
  //       const totalList = res.data.data.total;
  //       setTotal(totalList);
  //       setMaxPage(
  //         Math.ceil(totalList / pageSize) === 0
  //           ? 1
  //           : Math.ceil(totalList / pageSize)
  //       );
  //       setArr(
  //         [...Array(Math.ceil(totalList / pageSize))].map((e, i) => i + 1)
  //       );
  //     } else {
  //       onUpdateData([]);
  //       setTotal(0);
  //       setArr([]);
  //       setMaxPage(1);
  //     }
  //   });
  // }, [pageNum]);
  return (
    <ul className={ulClass}>
      <li className={liClass}>
        <button
          className={jumpClass}
          onClick={() => {
            setPageNum(1);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Image
            width={36}
            height={36}
            alt="row"
            src={`/assets/images/row.png`}
            className="object-cover rounded-lg shadow-[0_0_4px_rgba(0,_0,_0,_0.1)]"
          />
        </button>
      </li>

      {arr.map((e, i) => {
        if ((e === pageNum - 1 && e > 0) || e === pageNum + 1) {
          return (
            <li key={i} className={liClass}>
              <button
                onClick={() => {
                  setPageNum(e);
                }}
                style={{
                  cursor: "pointer",
                }}
                className={normalClass}
              >
                {e}
              </button>
            </li>
          );
        }
        if (e === pageNum) {
          return (
            <li key={i} className={liClass}>
              <a
                onClick={() => {
                  setPageNum(e);
                }}
                style={{
                  cursor: "pointer",
                }}
                className={activeClass}
              >
                {e}
              </a>
            </li>
          );
        }
        return null;
      })}

      <li>
        <button
          className={jumpClass}
          onClick={() => {
            setPageNum(maxPage);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Image
            width={36}
            height={36}
            alt="row"
            src={`/assets/images/row.png`}
            className="object-cover rotate-180 rounded-lg shadow-[0_0_4px_rgba(0,_0,_0,_0.1)]"
          />
        </button>
      </li>
    </ul>
  );
};
export default PagingType2;
