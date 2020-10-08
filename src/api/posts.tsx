import Axios from 'axios';
import { FiltersQuery } from '@/hooks/map';
import { UserInterface } from './user';
import { baseUrl } from './config';

export interface PostInterface {
  _id: string;
  type: PostType;
  category: PostCategory;
  title: string;
  description?: string;
  location: PointInterface;
  author?: UserInterface;
}

export interface PointInterface {
  type: 'Point';
  coordinates: [number, number];
}

export enum PostType {
  OFFER,
  REQUEST,
}
export const PostTypeDisplay = {
  [PostType.OFFER]: 'Offer',
  [PostType.REQUEST]: 'Request',
};
export const PostTypes = Object.keys(PostTypeDisplay);

export enum PostCategory {
  FOOD,
}
export const PostCategoryDisplay = {
  [PostCategory.FOOD]: 'Food',
};
export const PostCategories = Object.keys(PostCategoryDisplay);

function queryToString(filters: FiltersQuery): string {
  let queryString = '/?';
  Object.keys(filters).forEach((property) => {
    queryString +=
      filters[property] !== undefined
        ? `${property}=${filters[property]}&`
        : '';
  });

  queryString = queryString.slice(0, queryString.length - 1);
  return queryString.length > 2 ? queryString : '';
}

export async function getPosts(
  filters: FiltersQuery,
): Promise<PostInterface[]> {
  const response = await Axios.get<PostInterface[]>(
    `${baseUrl}/posts${queryToString(filters)}`,
  );
  return response.data as PostInterface[];
}

export interface CreatePostForm {
  title: string;
  type: PostType | string;
  category: PostCategory | string;
  description?: string;
}

export async function createPost(
  formData: CreatePostForm,
): Promise<PointInterface> {
  return Axios.post(`${baseUrl}/posts`, formData);
}
