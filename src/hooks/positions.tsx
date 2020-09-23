import { useEffect, useState } from 'react';

export type Position = [number, number];
export const defaultPosition: Position = [46.3791151, 24.8901918]; // Romania's center

interface PositionState {
  position: Position;
}

export const usePosition = (): PositionState => {
  const [position, setPosition] = useState<Position>(defaultPosition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geoPosition) => {
      setPosition([geoPosition.coords.latitude, geoPosition.coords.longitude]);
    });
  }, []);

  return { position };
};
