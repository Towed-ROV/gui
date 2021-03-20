import {
  Badge,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { CommandResponseContext } from "./CommandResponseProvider";
import { SensorCard } from "./SensorCard";

const SensorDisplay2 = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");

  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  const [newData, setNewData] = useState([]);
  const { addResponse } = useContext(CommandResponseContext);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sensors/data");

    eventSource.addEventListener("open", (e) => {
      setIsConnected(true);
      setIsConnectedText("Connected");
      console.log("The connection has been established.");
    });

    eventSource.addEventListener("data", (event) => {
      try {
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        switch (name) {
          case "sensor_data":
            setNewData(data);
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
      setIsConnected(false);
      setIsConnectedText("Disconnected");
      eventSource.close();
    });
    return () => eventSource.close();
  }, []);

  return (
    <VStack w="100%">
      <HStack my={4} ml={16} float="left" color={textColor} w="80%">
        <Heading>Sensordisplay</Heading>
        <Badge
          my={2}
          float="right"
          variant="solid"
          fontSize="sm"
          colorScheme={isConnected ? "green" : "red"}
        >
          {isConnectedText}
        </Badge>
        <Spacer />
        <Badge variant="solid" fontSize="md" colorScheme="teal">
          CHARTs
        </Badge>
      </HStack>
      <Wrap justify="space-evenly" w="100%">
        {newData ? (
          newData.map((sensor, idx) => (
            <WrapItem key={idx}>
              <SensorCard sensor={sensor} />
            </WrapItem>
          ))
        ) : (
          <Text color={textColor}>Empty</Text>
        )}
      </Wrap>
    </VStack>
  );
};

export default SensorDisplay2;
