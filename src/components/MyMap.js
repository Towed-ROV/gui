import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MyMap() {
  const pos = [1.45, 103.8];

  return (
    <MapContainer
      className="map"
      center={pos}
      zoom={10}
      style={{ height: 300, width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMap;
