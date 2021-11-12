import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import 'leaflet.heat';

const maxReducer = (key) => (acc, curr) => (acc[key] > curr[key] ? acc[key] : curr[key]);
const formatData = (latKey, lngKey, intensity, max) => (dataPoint) => ([
  dataPoint[latKey],
  dataPoint[lngKey],
  dataPoint[intensity] / max,
]);

const Heatmap = ({ dataPoints, latKey, lngKey, intensity }) => {
  if( dataPoints ) {
    const map = useMap();
    useEffect(() => {
      const max = dataPoints.reduce(maxReducer(intensity));
      const points = dataPoints ? dataPoints.map(formatData(latKey, lngKey, intensity, max)) : [];
      L.heatLayer(points, { minOpacity: 0 }).addTo(map);
    })
  }
  return null;
};

export default Heatmap;