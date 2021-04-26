import {
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";
import { SENSOR_LIVE_STREAM } from "../db/config";
import { CommandResponseContext } from "./CommandResponseProvider";

const SensorDisplay = () => {
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const { sensorData, setSensorData, addResponse } = useContext(
    CommandResponseContext
  );

  useEffect(() => {
    let eventSource = new EventSource(SENSOR_LIVE_STREAM);
    eventSource.addEventListener("open", (e) => {});
    eventSource.addEventListener("stream", (event) => {
      try {
        // @ts-ignore
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        switch (name) {
          case "sensor_data":
            setSensorData(data);
            break;
          case "response":
            data.map((resp) => addResponse(resp));
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });
    eventSource.addEventListener("close", (e) => {
      eventSource.close();
    });
    return () => eventSource.close();
  }, []);

  return (
    <VStack
      w="100%"
      h="100%"
      bg={boxColor}
      color={textColor}
      p={4}
      boxShadow="dark-lg"
    >
      <Flex h="10%">
        <Center my={4} color={textColor} alig="center">
          <Heading alig="center" size="lg">
            METRICS
          </Heading>
        </Center>
      </Flex>
      <Flex h="90%" w="100%">
        <Table variant="striped" colorScheme="blackAlpha" size="sm" h="100%">
          <Thead>
            <Tr>
              <Th style={{ width: "200px", textAlign: "left" }}>Name</Th>
              <Th isNumeric style={{ width: "200px", textAlign: "right" }}>
                Value
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sensorData &&
              sensorData.map((sensor, idx) => (
                <Tr key={idx}>
                  <Td style={{ width: "200px" }}>{sensor.name}</Td>
                  <Td isNumeric style={{ width: "200px" }}>
                    {sensor.value}
                  </Td>
                </Tr>
              ))}
            {!sensorData && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </Tr>
            )}
            {sensorData && !sensorData.length && (
              <Tr>
                <Td
                  style={{ textAlign: "center" }}
                  colSpan="4"
                  className="text-center"
                >
                  <div className="p-2">No data</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Flex>
      {/* <Wrap justify="space-evenly" w="100%" px={4}>
        {dummyData ? (
          dummyData.map((sensor, idx) => (
            <WrapItem key={idx}>
              <SensorCard sensor={sensor} />
            </WrapItem>
          ))
        ) : (
          <Text color={textColor}>Empty</Text>
        )}
      </Wrap> */}
    </VStack>
  );
};

export default SensorDisplay;
