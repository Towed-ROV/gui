import React, { useContext, useEffect, useState } from "react";
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
import { CommandResponseContext } from "./CommandResponseProvider";

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

const wp = {
  id: 0,
  latitude: 62.383713,
  longitude: 6.977545,
};

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
  const { sensorData } = useContext(CommandResponseContext);

  const [waypoints, setWaypoints] = useState(data);
  const [waypoint, setWaypoint] = useState(wp);
  const pos = [62.4698, 6.1872];

  useEffect(() => {
    const wp = { id: 0, latitude: 62.383713, longitude: 6.977545 };

    sensorData.forEach((sensor) => {
      if (sensor.name === "latitude") {
        wp.latitude = sensor.value;
      } else if (sensor.name === "longitude") {
        wp.longitude = sensor.value;
      } else {
        // pass
      }
    });
    setWaypoint(wp);
  }, [sensorData]);

  return (
    <Flex w="100%" h="100%" bg="yellow.200">
      <MapContainer
        className="map"
        center={[waypoint.latitude, waypoint.longitude]}
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
        {/* {waypoints &&
          waypoints.map((wp) => (
            <Marker key={wp.id} position={[wp.latitude, wp.longitude]}>
              <Popup>ID: {wp.id}</Popup>
            </Marker>
          ))} */}
        <Marker
          key={waypoint.id}
          position={[waypoint.latitude, waypoint.longitude]}
        >
          <Popup>ID: {waypoint.id}</Popup>
        </Marker>
      </MapContainer>
    </Flex>
  );
};

export default Minimap;
