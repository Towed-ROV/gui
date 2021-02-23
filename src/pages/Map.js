import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import offlineImage from "../assets/offline.png";

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

const Map = () => {
  const x = 62.4698;
  const y = 6.1872;
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [newY, setnewY] = useState(y);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     let interval = 0.0001;
  //     setnewY(newY + interval);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [newY]); // Pass in empty array to run effect only once!

  return (
    <Flex h="80vh" mx="2vw" bg={boxColor} color={textColor}>
      <MapContainer
        className="map"
        center={[x, newY]}
        zoom={18}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[x, newY]} />
      </MapContainer>
    </Flex>
  );
};

export default Map;
