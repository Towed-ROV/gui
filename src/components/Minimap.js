import React, { useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

let data = [
  {
    id: 0,
    latitude: 62.383713,
    longitude: 6.977545,
  },
  {
    id: 1,
    latitude: 62.383713,
    longitude: 6.977545 + 0.001,
  },
  {
    id: 2,
    latitude: 62.383713,
    longitude: 6.977545 + 0.002,
  },
  {
    id: 3,
    latitude: 62.383713,
    longitude: 6.977545 + 0.003,
  },
];

const Minimap = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const [waypoints, setWaypoints] = useState(data);
  const pos = [62.4698, 6.1872];

  return (
    <Flex w="100%" h="100%" bg="yellow.200">
      <MapContainer
        className="map"
        center={[62.38384575, 6.97875625]}
        zoom={16}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {waypoints &&
          waypoints.map((wp) => (
            <Marker key={wp.id} position={[wp.latitude, wp.longitude]}>
              <Popup>ID: {wp.id}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </Flex>
  );
};

export default Minimap;
