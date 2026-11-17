import dynamic from 'next/dynamic';
// import BaoInView from "./page-view";

const BaoInView = dynamic(() => import("./page-view"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function Page({
  params,
}: {
  params: { slug: string | undefined };
}) {
  let slugRouter = params.slug;
  return (
    <BaoInView slugRouter={slugRouter}/>
  )
}
