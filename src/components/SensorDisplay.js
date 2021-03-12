import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SensorCard } from "./SensorCard";

const dummyData = [
  {
    name: "Temperature",
    origin: 0.1337,
    role: "PUB",
    value: "A5",
  },
  {
    name: "Pressure",
    origin: 1337,
    role: "PUBSUB",
    value: "COM4",
  },
  {
    name: "Humidity",
    origin: "Arduino 3",
    role: "SUB",
    value: "D11",
  },
  {
    name: "PER",
    origin: 0.1337,
    role: "PUB",
    value: "123",
  },
  {
    name: "PÅ",
    origin: 0.1337,
    role: "PUB",
    value: "343",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
  },
  {
    name: "Oxygen",
    origin: 0.1337,
    role: "PUB",
    value: "A0",
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
    <Wrap justify="space-evenly" w="100%">
      {dummyData.map((sensor, idx) => (
        <WrapItem key={idx}>
          <SensorCard sensor={sensor} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default SensorDisplay;
