import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SensorCard } from "./SensorCard";

const SensorDisplay = () => {
  const testData = [
    {
      name: "default_1",
      value: 111,
    },
    {
      name: "default_2",
      value: 222,
    },
    {
      name: "default_3",
      value: 333,
    },
  ];

  const [newData, setNewData] = useState([]);

  const tempBG = useColorModeValue("gray.50", "gray.800");

  const testParse = (stuff) => {
    try {
      console.log(JSON.parse(stuff));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sensors/data");
    eventSource.addEventListener("data", (event) => {
      try {
        let data = JSON.parse(event.data);
        setNewData(data.payload_data);
      } catch (err) {
        console.log(err);
      }
    });
    eventSource.addEventListener("close", () => eventSource.close());
    return () => eventSource.close();
  }, []);

  return (
    <Flex height="100px">
      <Box as="section" bg={tempBG} p="2">
        <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {newData.map((stat, idx) => (
              <SensorCard key={idx} data={stat} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default SensorDisplay;
