import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css'
import MarkerBuilder from './Map/MarkerBuilder';
import Heatmap from "./Map/Heatmap";
import "./Map/_leaflet-icon.fix";
import  getProperties from './properties.service';


const average = (attribute, properties) => properties.reduce((acc, curr) => acc + curr[attribute], 0) / properties.length;

// default to Toronto while we wait for data to load
const defaultPosition = {
  lat: 43.6532,
  lng: -79.347015,
};

const Map = () => {
  const [properties, setProperties] = useState();
  const [position, setPosition] = useState(defaultPosition);
  useEffect(() => {
    getProperties().then(res => {
      setProperties(res);
    }).then(() => {
      properties && setPosition({
        lat: average('latitude', properties),
        lng: average('longitude', properties),
      });
    });
    }, [setProperties])

  return (
    <MapContainer id="map" center={position} zoom={5}>
      <LayersControl>
        <LayersControl.BaseLayer name="Base" checked>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            accessToken="pk.eyJ1IjoibWh3YXRzb24iLCJhIjoiY2t2d2ozbDkzMGNvbDJwbm9tdG1jeW51eCJ9.V0GzghY0xbO6cRzIXWs8dQ"
            id="mapbox/streets-v11"
          />
          <Heatmap dataPoints={properties} latKey="latitude" lngKey="longitude" intensity="total_views" />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Markers" checked>
        <LayerGroup>
          <MarkerBuilder properties={properties} />
        </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer> 
  );
}

export default Map;
