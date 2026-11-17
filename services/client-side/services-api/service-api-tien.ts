'use client';
import { AxiosResponse } from 'axios';
import { AxiosConfig } from '../axios.config';
import { Data, MetaData } from '@/types/metadata';
import { Article, FooterType, HeaderType } from '@/types/articleNews';
const api = AxiosConfig();
export const getBannerHeader = (): Promise<AxiosResponse<Data<HeaderType>>> => {
  return api.get('/web/header-get-info', {
    params: ''
  });
};
export const getBannerFooter = (): Promise<AxiosResponse<Data<FooterType>>> => {
  return api.get('/web/footer-get-info', { params: '' });
};

export const getMultiMediaCSR = (
  offset: number,
  limit: number,
  article_type_slug?: string
): Promise<AxiosResponse<MetaData<Article>>> => {
  if (article_type_slug === 'emagazine') article_type_slug = 'e-magazine';
  return api.get('/web/article-media-get-list', {
    params: {
      offset,
      limit,
      article_type_slug,
    },
  });
};
