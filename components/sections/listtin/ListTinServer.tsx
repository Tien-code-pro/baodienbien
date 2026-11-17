import PageTypePC1 from "@/components/pageTypePC/PageTypePC1";
import PageTypePC2 from "@/components/pageTypePC/PageTypePC2";
import BlockMultimedia from "@/components/blockHome/BlockMultimedia";
import {
  Article,
  ArticleMedia,
  CategoryMenuResponse,
} from "@/types/articleNews";
import moment from "moment";
import Link from "next/link";
import {
  getArticleMediaApiSSR,
  getArticlesByCategorySlugSSR,
  getCategoryDetailSSR,
} from "@/services/server-side/services-api/serviceAnhht-api";
import dynamic from "next/dynamic";
// import ListTinDisplay from "./ListTinDisplay";
const ListTinDisplay = dynamic(() => import("./ListTinDisplay"), {
  ssr: false, // Tắt SSR
  loading: () => <p>Đang tải...</p>,
});
export default async function ListTinServer({
  category_slug,
}: {
  category_slug: string;
}) {
  const [articlesRes, categoryRes, mediaRes] = await Promise.all([
    getArticlesByCategorySlugSSR(category_slug, 20),
    getCategoryDetailSSR(category_slug),
    getArticleMediaApiSSR({ limit: 5, offset: 0 }),
  ]);
  const data: Article[] = articlesRes?.data?.data?.list || [];
  const total = articlesRes?.data?.data?.total || 0;
  const category: CategoryMenuResponse | undefined = categoryRes?.data?.data;
  const resultArticleMedia: ArticleMedia[] = mediaRes?.data?.data?.list || [];
  return (
    // <div className="text-black">Data: {JSON.stringify(data)}</div>
    <section className={`  pb-5 px-4 2xl:px-0 `}>
      <ListTinDisplay
        initialData={data}
        total={total}
        category={category}
        category_slug={category_slug}
        resultArticleMedia={resultArticleMedia}
      />
    </section>
  );
}
