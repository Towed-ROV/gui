import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { ChartDataContext } from "./ChartDataProvider";
import { CommandResponseContext } from "./CommandResponseProvider";
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
];

const SensorDisplay = () => {
  const [newData, setNewData] = useState([]);
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  const { addResponse } = useContext(CommandResponseContext);
  const { addChartData } = useContext(ChartDataContext);

  const chartNames = ["temperature"];

  const dispatchChartData = (data) => {
    // data.map((sensor, index) => {
    //   if (chartNames.includes(sensor.name)) {
    //     addChartData(sensor);
    //   }
    // });
    // TODO:
    /**
     * Check if name is in chartNames
     * store name
     * store value
     * create common obj
     * put obj in chartList, display chartList
     * create a Area pr name
     */
  };

  // useEffect(() => {
  //   let eventSource = new EventSource("http://localhost:8000/sensors/data");

  //   eventSource.addEventListener("open", (e) => {
  //     setIsConnected(true);
  //     setIsConnectedText("Connected");
  //     console.log("The connection has been established.");
  //   });

  //   eventSource.addEventListener("data", (event) => {
  //     try {
  //       let payload = JSON.parse(event.data);
  //       let name = payload.payload_name;
  //       let data = payload.payload_data;
  //       if (name === "sensor_data") {
  //         setNewData(data);
  //       } else if (name === "response") {
  //         handleAddResponse(data);
  //       } else {
  //         // pass
  //       }
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

  const handleAddResponse = (payload_data) => {
    payload_data.map((resp) => {
      addResponse(resp);
    });
  };

  return (
    <VStack w="100%">
      <HStack my={4} ml={16} float="left" color={textColor} w="100%">
        <Heading>Datastream</Heading>
        <Badge
          my={2}
          float="right"
          variant="solid"
          fontSize="sm"
          colorScheme={isConnected ? "green" : "red"}
        >
          {isConnectedText}
        </Badge>
      </HStack>
      <Text></Text>
      <Wrap justify="space-evenly" w="100%">
        {dummyData ? (
          dummyData.map((sensor, idx) => (
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

export default SensorDisplay;
