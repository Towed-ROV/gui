import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SensorCard } from "./SensorCard";

const dummyData = [
  {
    name: "Temperature",
    origin: 0.1337,
    role: "PUB",
    port: "A5",
  },
  {
    name: "Pressure",
    origin: 1337,
    role: "PUBSUB",
    port: "COM4",
  },
  {
    name: "Humidity",
    origin: "Arduino 3",
    role: "SUB",
    port: "D11",
  },
  {
    name: "PER",
    origin: 0.1337,
    role: "PUB",
    port: "123",
  },
  {
    name: "PÅ",
    origin: 0.1337,
    role: "PUB",
    port: "343",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    port: "A0",
  },
];

const SensorDisplay = () => {
  const [newData, setNewData] = useState([]);
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  // useEffect(() => {
  //   let eventSource = new EventSource("http://localhost:8000/sensors/data");

  //   eventSource.addEventListener("open", (e) => {
  //     setIsConnected(true);
  //     setIsConnectedText("Connected");
  //     console.log("The connection has been established.");
  //   });

  //   eventSource.addEventListener("data", (event) => {
  //     try {
  //       let data = JSON.parse(event.data);
  //       setNewData(data.payload_data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  //   eventSource.addEventListener("close", (e) => {
  //     setIsConnected(false);
  //     setIsConnectedText("Disconnected");
  //     eventSource.close();
  //   });
  //   return () => eventSource.close();
  // }, []);

  return (
    <Flex justify="space-evenly" p={4} bg="blue" w="100%" h="100%">
      <VStack bg="red" w="100%">
        <Box>
          <Badge fontSize="2em" colorScheme={isConnected ? "green" : "red"}>
            {isConnectedText}
          </Badge>
        </Box>

        <VStack spacing="6px">
          {dummyData.map((sensor, idx) => (
            <SensorCard key={idx} sensor={sensor} />
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default SensorDisplay;

// {dummyData.map((sensor, idx) => (
//   <li key={idx}>
//     Name: {sensor.name} - Value: {sensor.port}
//   </li>
// ))}
// {}

{
  /* <Box as="section" bg={boxColor} p="2">
  <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
    {newData.map((sensor, idx) => (
      <SensorCard key={idx} sensor={sensor} />
    ))}
  </SimpleGrid>
</Box> */
}
