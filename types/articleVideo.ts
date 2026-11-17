import { ArticleChildCategory, CategoryMenu } from "@/types/category";

export interface ArticleAudioVideo {
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
}

export interface Video {
  article_slug: string;
  article_type_id: number;
  avatar_image: string;
  article_title: string;
  article_sapo: string;
  article_content: string;
  author: number;
  author_name: string;
  other_author: string;
  leak_url: string;
  tag_list: string;
  tag_list_info: Tag[];
  list_file_info: PlayVideo[];
  enable_comment: number;
  publish_date: string;
  view_count: number;
  menu?: CategoryMenu;
}

export interface Tag {
  tag_name: string;
  tag_slug: string;
}

export interface PlayVideo {
  file_info_id: number;
  file_name: string;
  file_type: string;
  file_url: string;
  witdh: string;
  height: string;
}

export interface VideoList {
  category_id: number;
  parent_id: number;
  menu_name: string;
  menu_slug: string;
  menu_image: string;
  menu_position: number;
  list_article: any;
  child_menu: ArticleChildCategory[];
  parent_menu?: CategoryMenu[];
}
export interface Event {
  event_id: number;
  event_name: string;
  event_description: string;
  event_content: string;
  event_slug: string;
  tag_list: string;
  start_date: string;
  end_date: string;
  image_link: string;
  media_link: string;
  source_type: string;
  event_status: number;
  drm_status: number;
  user_create_id: number;
  created_date: string;
  user_modify_id: number;
  modified_date: any;
}
export interface Channel {
  live_channel_id: number;
  channel_title: string;
  description: string;
  slug: string;
  source_type: string;
  link: string;
  channel_status: number;
  drm_status: number;
  user_create_id: number;
  created_date: string;
  user_modify_id: number;
  modified_date: any;
  image_url: string;
}

export interface PlayLive {
  live_channel_id: number;
  channel_title: string;
  description: string;
  slug: string;
  source_type: string;
  link: string;
  channel_status: number;
  drm_status: number;
  user_create_id: number;
  created_date: string;
  user_modify_id: number;
  modified_date: string;
  image_url: string;
}

export interface PlayEvent {
  event_id: number;
  event_name: string;
  event_description: string;
  event_content: string;
  event_slug: string;
  tag_list: string;
  start_date: string;
  end_date: string;
  image_link: string;
  media_link: string;
  source_type: string;
  event_status: number;
  drm_status: number;
  user_create_id: number;
  created_date: string;
  user_modify_id: number;
  modified_date: any;
}
