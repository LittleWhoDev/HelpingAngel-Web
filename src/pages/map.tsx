import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

const Map: React.FC<{}> = () => (
  <>
    <MapComponent />
  </>
);
export default Map;
