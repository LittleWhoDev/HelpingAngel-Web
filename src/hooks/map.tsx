import { PostInterface, getPosts, PostCategory } from '@/api/posts';
import { useState, useEffect, createContext } from 'react';
import { usePosition, Position, defaultPosition } from './positions';

export interface MapState {
  posts: PostInterface[];
  filters: FiltersQuery;
  setFilters: (filters: FiltersQuery) => void;
  position: Position;
}

export interface FiltersQuery {
  category?: PostCategory;
  text?: string;
  range?: number;
  lat?: number;
  long?: number;
}

export const MapContext = createContext<Partial<MapState>>({ posts: [] });

export const useMapState = (): MapState => {
  const { position } = usePosition();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [filters, setFilters] = useState<FiltersQuery>({
    range: 30,
    lat: defaultPosition[0],
    long: defaultPosition[1],
  });

  useEffect(() => {
    getPosts(filters).then((val) => {
      setPosts([...val]);
    });
  }, [filters]);

  useEffect(() => {
    setFilters({ ...filters, lat: position[0], long: position[1] });
  }, [position]);

  return { posts, filters, setFilters, position };
};
