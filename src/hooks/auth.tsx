import { getItem } from '@/state/persistent';
import Axios from 'axios';
import React from 'react';

export const withAuthenticatedRequests = (
  Component: React.ComponentType,
): React.ComponentType => {
  const newComponent: React.FC<any> = (props) => {
    Axios.interceptors.request.use((config) => {
      const token = getItem('token');
      if (token !== undefined) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
      return config;
    });
    return <Component {...props} />;
  };
  return newComponent;
};
