import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box, Flex } from "@chakra-ui/react";

const Map = () => {
  const pos = [62.5, 6.2];

  return (
    <Flex bg="rov.dark" color="rov.dark">
      <MapContainer
        className="map"
        center={pos}
        zoom={12}
        style={{
          margin: 0,
          height: "92vh",
          width: "100vw",
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Flex>
  );
};

export default Map;
