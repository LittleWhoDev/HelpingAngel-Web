import L from 'leaflet';

export const donnerMapIcon = new L.Icon({
  iconUrl: 'donation.svg',
  iconSize: [40, 40],
  iconAnchor: [15, 35],
  popupAnchor: [5, -40],
});

export const recieverMapIcon = new L.Icon({
  iconUrl: 'home.svg',
  iconSize: [40, 40],
  iconAnchor: [15, 35],
  popupAnchor: [5, -40],
});
