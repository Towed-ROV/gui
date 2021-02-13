import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  Box,
  Image,
  Badge,
  Text,
  Icon,
  Flex,
  Button,
  useColorMode,
} from "@chakra-ui/react";

const Map = () => {
  const pos = [1.45, 103.8];

  return (
    <Box
      w="400px"
      rounded="20px"
      border="1px solid"
      boxShadow="sm"
      borderColor="gray.300"
      overflow="hidden"
    >
      <MapContainer
        className="map"
        // @ts-ignore
        center={pos}
        zoom={10}
        style={{ height: 300, width: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
};

export default Map;
