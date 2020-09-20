import { usePosition } from '@/hooks/positions';
import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

// WARNING: This module MUST be loaded only dynamically
// It also requires loading custom CSS from an external URL

const defaultZoom = 13;

const Map: React.FC<{}> = () => {
  const { position } = usePosition();

  return (
    <div style={{ height: '600px' }}>
      <LeafletMap center={position} zoom={defaultZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
};
export default Map;
