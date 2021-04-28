import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { CommandResponseContext } from "./CommandResponseProvider";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const wp = {
  id: 0,
  latitude: 62.383713,
  longitude: 6.977545,
};

const Minimap = () => {
  const { sensorData } = useContext(CommandResponseContext);

  // const [waypoints, setWaypoints] = useState([]);
  // TODO: trace the 'marker' position, whenever it changes
  const [waypoint, setWaypoint] = useState(wp);

  const centerLat = 62.4698;
  const centerLng = 6.1872;

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
        center={[centerLat, centerLng]}
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
        <Marker
          key={waypoint.id}
          position={[waypoint.latitude, waypoint.longitude]}
        >
          <Popup>ID: {wp.id}</Popup>
        </Marker>
      </MapContainer>
    </Flex>
  );
};

export default Minimap;
