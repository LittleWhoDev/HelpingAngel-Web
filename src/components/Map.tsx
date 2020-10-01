import { MapContext } from '@/hooks/map';
import React, { useContext } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
import { donnerMapIcon, recieverMapIcon } from '@/utils/map';
import { Typography } from '@material-ui/core';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// WARNING: This module MUST be loaded only dynamically
// It also requires loading custom CSS from an external URL

const defaultZoom = 13;

const useStyles = makeStyles({
  mapContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

const Map: React.FC<{}> = () => {
  const { posts, position } = useContext(MapContext);
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <LeafletMap
        center={position}
        zoom={defaultZoom}
        zoomControl={false}
        className="markercluster-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {posts.map((post) => (
            <Marker
              key={post._id}
              position={post.location.coordinates}
              icon={post.type ? recieverMapIcon : donnerMapIcon}
            >
              <Popup closeButton={false}>
                <Typography variant="body1" align="center">
                  {post.title}
                </Typography>
                <br />
                <Typography variant="body2" align="center">
                  {post.description}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </LeafletMap>
    </div>
  );
};

export default Map;
