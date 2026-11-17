import { redirect } from "next/navigation";

export default async function TinTucPage({
  params,
}: {
  params: { tin_tuc: string | undefined };
}) {
  redirect("/");
  // return (
  //     <>
  //         {/* Tương lai, module danh sách tin tức theo loại bài sẽ ở đây! */}
  //     </>
  // );
}
