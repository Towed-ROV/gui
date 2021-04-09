import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const db = [
  {
    id: 1,
    img_name: "test_img_123.jpg",
    latitude: 0.55,
    longitude: 0.55,
  },
  {
    id: 2,
    img_name: "test_img_123.jpg",
    latitude: 0.55,
    longitude: 0.55,
  },
  {
    id: 3,
    img_name: "test_img_123.jpg",
    latitude: 0.55,
    longitude: 0.55,
  },
  {
    id: 4,
    img_name: "test_img_123.jpg",
    latitude: 0.55,
    longitude: 0.55,
  },
  {
    id: 5,
    img_name: "test_img_123.jpg",
    latitude: 0.55,
    longitude: 0.55,
  },
];

const Test = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [waypoints, setWaypoints] = useState(db);
  const [sessionId, setSessionId] = useState("");
  const [id, setId] = useState(10);

  const addWaypoint = (wp) => {
    const wps = [...waypoints];
    if (wps.length > 4) {
      wps.shift();
    }
    wps.push(wp);
    setWaypoints(wps);
  };

  const saveDataAndDisplay = async (sensorData) => {
    const wp = filterWaypointData(sensorData);
    if (wp !== undefined) {
      const r = await postSessionData(wp, sensorData);
      const response = await r.data;
      const newWp = extractWaypoint(response);
      addWaypoint(newWp);
    }
  };

  const extractWaypoint = (wp) => {
    return {
      session_id: wp.session_id,
      latitude: wp.latitude,
      longitude: wp.longitude,
    };
  };

  const postSessionData = async (wp, sensorData) => {};

  const filterWaypointData = (sensorData) => {
    var waypoint = undefined;
    // TODO: check for lat and longitude
    // TODO: check distance > 2 m, then go add, otherwise => pass
    sensorData.forEach((sensor) => {});
    return waypoint;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setId((id) => id + 1);
      const numb = Math.random().toPrecision(5);
      const wp = {
        id: id,
        img_name: `img_test_name_${id}.jpg`,
        latitude: numb,
        longitude: numb,
      };
      wp;
      addWaypoint(wp);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [addWaypoint]);

  return (
    <Flex
      h="92vh"
      mx="1vw"
      my="1vh"
      boxShadow="dark-lg"
      rounded="lg"
      color={textColor}
      bg={boxColor}
      align="center"
      justify="center"
      p={10}
    >
      <SimpleGrid
        columns={2}
        spacing={10}
        w="100%"
        h="50%"
        align="center"
        justify="center"
        p={10}
      >
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th style={{ width: "200px", textAlign: "left" }}>Id</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Img name</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Latitude</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Longitude</Th>
            </Tr>
          </Thead>
          <Tbody>
            {waypoints &&
              waypoints.map((sensor) => (
                <Tr key={sensor.id}>
                  <Td style={{ width: "200px" }}>{sensor.id}</Td>
                  <Td style={{ width: "200px" }}>{sensor.img_name}</Td>
                  <Td style={{ width: "200px" }}>{sensor.latitude}</Td>
                  <Td style={{ width: "200px" }}>{sensor.longitude}</Td>
                </Tr>
              ))}
            {!waypoints && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </Tr>
            )}
            {waypoints && !waypoints.length && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No waypoints to display</div>
                </td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Box>Box 2</Box>
      </SimpleGrid>
    </Flex>
  );
};

export default Test;
