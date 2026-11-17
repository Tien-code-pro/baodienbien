import ListTin from "@/components/sections/listtin/ListTin";
import ListTinServer from "@/components/sections/listtin/ListTinServer";
import { getMenuHeaderSSR } from "@/services/server-side/services-api/serviceAnhht-api";
async function getAllCategorySlugs(): Promise<any[]> {
  const res = await getMenuHeaderSSR();
  if (!res.data || res.data.status <= 0) {
    return [];
  }
  return res.data.data.list.map((slug) => slug.menu_slug) || [];
}
export const dynamic = "force-static";
export const revalidate = 120;
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  if (!slugs || slugs.length === 0) {
    return [];
  }
  return slugs.map((slug) => ({ category_slug: slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: { category_slug: string };
}) {
  return <ListTinServer category_slug={params.category_slug} />;
}
