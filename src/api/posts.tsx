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

export enum PostCategory {
  FOOD,
}

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
