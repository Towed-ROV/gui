import { Image, Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import loadIMG from "../assets/loading.gif";
import React from "react";

const WaypointCard = (props) => {
  const IMG = `http://localhost:8000/videos/${props.imgName}`;

  return (
    <Box id={props.id} mt={3} borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={IMG} fallbackSrc={loadIMG} alt="noImage" />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.sensors &&
            props.sensors.map((sensor) => (
              <Tr key={sensor.id}>
                <Td>{sensor.name}</Td>
                <Td>{sensor.value}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WaypointCard;
