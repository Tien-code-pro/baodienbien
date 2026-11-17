import { PlayVideo } from "@/types/articleVideo";
import { CategoryMenu } from "./category";

export interface ArticleNews {
  article_id: number;
  article_slug: string;
  avatar_image: null | string;
  article_title: string;
  article_sapo: string;
  category_slug: string;
  category_name: string;
  outstanding: number;
  is_selected: number;
  order_position: number;
  view_count: number;
  article_type_slug?: string;
  live_status?: number;
  publish_date: string;
}

export interface Article {
  article_slug: string;
  article_id: number;
  article_type_id: number;
  avatar_image: string;
  article_title: string;
  sub_title: string;
  article_sapo: string;
  article_content: string;
  author: number;
  author_name: string;
  other_author: string;
  leak_url: string;
  tag_list: string;
  tag_list_info: Tag[];
  enable_comment: number;
  publish_date: string;
  view_count: number;
  menu?: CategoryMenu;
  list_file_info?: PlayVideo[];
  live_status?: number;
  list_article_live?: ListArticleLive[];
  start_time: string;
  refresh_time: string;
  category_name: string;
  child_menu: child_menu[];
  article_type_slug: string;
  category_slug: string;
  pen_name: string;
  is_multi_media: number;
}

export interface child_menu {
  category_id: number;
  parent_id: number;
  menu_name: string;
  menu_slug: string;
  menu_image: string;
  menu_position: number;
  list_article: ArticleNews[];
  child_menu: child_menu[];
  parent_menu: [];
}
export interface Tag {
  tag_name: string;
  tag_slug: string;
}
export interface HotLink {
  hot_link_id: number;
  title: string;
  link: string;
  display_order: number;
  status: number;
  created_date: string;
}
export interface GroupVideo {
  category_id: number;
  category_name: string;
  list_articles: ArticleNews[];
}

export interface PaperType {
  article_paper_type_id: number;
  paper_type_name: string;
}
export interface OtherAuthorInfo {
  user_id: number;
  author_name: string;
}
export interface ListArticleLive {
  article_content: string;
  article_live_id: number;
  article_live_title: string;
  author_name: string;
  author: number;
  display_time: string;
  modified_date: string;
  other_author_info: OtherAuthorInfo[];
  sort: number;
  start_time: string;
}
export interface ArticleMedia {
  stt: number;
  article_id: number;
  article_slug: string;
  category_slug: string;
  avatar_image: string;
  article_title: string;
  article_sapo: string;
  article_type_slug: string;
  is_multi_media: number;
  publish_date: Date;
  article_status_id: number;
}

export interface CategoryMenuResponse {
  category_id: number;
  parent_id: number;
  menu_name: string;
  menu_slug: string;
  menu_image: string;
  menu_position: number;
  list_article: any[];
  child_menu: CategoryMenuResponse[] | null;
  parent_menu: CategoryMenuResponse[] | null;
}

export interface VideoNews {
  article_slug: string;
  article_id: number;
  avatar_image: string;
  article_title: string;
  article_sapo: string;
  leak_url: string;
  publish_date: string;
  view_count: number;
  list_file_info?: PlayVideo[];
  live_status?: number;
  category_name: string;
  article_type_slug: string;
  is_multi_media: string;
  is_speech: string;
  outstanding: number;
  is_selected: number;
  order_position: number;
}

export interface HeaderType {
  header_id: number;
  banner_url: string;
  phone_number: number;
  email: string;
  facebook_link: string;
  youtube_link: string;
  tiktok_link: string;
  zalo_link: string;
}

export interface FooterType {
  footer_id: number;
  logo_url: string;
  description: string;
  contact_info: string;
  copyright_info: string;
  android_link: string;
  ios_link: string;
  facebook_link: string;
  zalo_link: string;
  youtube_link: string;
}

export interface ArticleType {
  article_type_id: number;
  article_type_name: string;
  article_type_slug: string;
}

export interface ShortVideoType {
  article_id: number;
  article_title: string;
  article_sapo?: string;
  avatar_image?: string;
  file_url: string;
  current_slug: string;
  before_slug: string;
  after_slug: string;
  slug?: string;
  publish_date: Date;
}
