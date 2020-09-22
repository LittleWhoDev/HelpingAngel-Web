import Axios from 'axios';
import { baseUrl } from './config';
import { UserInterface } from './user';

export interface PostInterface {
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

export async function getAllPosts(): Promise<PostInterface[]> {
  return [
    {
      type: PostType.OFFER,
      category: PostCategory.FOOD,
      title: 'Mock data',
      location: {
        type: 'Point',
        coordinates: [46, 25],
      },
    },
  ];
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
