import { Article } from "./articleNews";

export interface CategoryMenu {
  category_id: number;
  menu_name: string;
  menu_slug: string;
  menu_image: string;
  menu_position: number;
  child_menu: CategoryMenu[];
  parent_menu?: CategoryMenu[];
  parent_id: number;
}
export interface ArticleChildCategory extends CategoryMenu {
  list_article: Article[];
}
export interface TabCategoryArticle {
  category_id: number;
  menu_name: string;
  menu_slug: string;
  menu_image: string;
  menu_position: number;
  child_menu: ArticleChildCategory[];
  parent_menu?: CategoryMenu[];
}

export interface AdvertisementType {
  ad_id: number;
  ad_name: string;
  ad_type: string;
  device_type: string;
  page_type: number;
  page_type_name: string;
  display_position: number;
  display_position_name: string;
  priority: number;
  datetime_from: string;
  datetime_to: string;
  ad_content: string;
  customer_info: string;
  url: string;
  status: number;
  status_display: string;
  is_display: number;
  user_create_id: number;
  created_date: string;
  user_modify_id: number;
  modified_date: string;
  image_url: string;
}
export interface Comment {
  comment_id: string;
  parent_id: string;
  account_id: number;
  likeAccount: any[]; // Nếu có kiểu dữ liệu cụ thể cho "likeAccount", bạn có thể thay thế `any[]` bằng kiểu cụ thể
  user_name: string;
  full_name: string;
  content: string;
  status: number;
  like: number;
  created_date: string; // Có thể sử dụng `Date` nếu cần xử lý ngày tháng
  approve_date: string; // Tương tự `Date` thay vì `string`
  user_approve_id: number;
  countChildComment: number;
  created_date_format: string;
}
export interface CommentType {
  child_comment: Comment[];
  parrent_comment: Comment;
}
