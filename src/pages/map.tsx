import React from 'react';
import dynamic from 'next/dynamic';
import { MapContext, useMapState } from '@/hooks/map';
import Filter from '@/components/Filter';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

const Map: React.FC<{}> = () => {
  const mapState = useMapState();

  return (
    <>
      <MapContext.Provider value={mapState}>
        <MapComponent />
        <Filter />
      </MapContext.Provider>
    </>
  );
};
export default Map;
