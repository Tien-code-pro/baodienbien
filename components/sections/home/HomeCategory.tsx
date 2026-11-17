"use client";

import { getMenuNavigateApi } from "@/services/client-side/services-api/service1";
import { CategoryMenu } from "@/types/category";
import { useEffect, useState } from "react";
import CategoryBlock1 from "./CategoryBlock1";
import CategoryBlock2 from "./CategoryBlock2";
import CategoryBlock3 from "./CategoryBlock3";
import CategoryBlock4 from "./CategoryBlock4";
import CategoryBlock5 from "./CategoryBlock5";

export default function HomeCategory() {
  const [listCategory, setListCategory] = useState<CategoryMenu[]>([]);

  useEffect(() => {
    getMenuNavigateApi().then((res) => {
      if (
        res.data.status > 0 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.list.length > 0
      ) {
        setListCategory(res.data.data.list);
      }
    });
  }, []);
  return (
    <>
      {listCategory
        .filter((x, y) => y < 7)
        .map((e, i, arr) => {
          switch (i) {
            case 0:
              return <CategoryBlock1 category_slug={e.menu_slug} key={i} />;
            case 1:
              return <CategoryBlock2 category_slug={e.menu_slug} key={i} />;

            case 2:
              return <CategoryBlock3 category_slug={e.menu_slug} key={i} />;
            case 5:
              return (
                <CategoryBlock4
                  category_slug1={arr[3].menu_slug}
                  category_slug2={arr[4].menu_slug}
                  category_slug3={arr[5].menu_slug}
                  category_slug4={arr[6].menu_slug}
                  key={i}
                />
              );
          }
        })}
      <CategoryBlock5 list_category={listCategory.filter((x, y) => y >= 7)} />
    </>
  );
}
