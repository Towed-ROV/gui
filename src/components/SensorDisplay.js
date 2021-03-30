import {
  Badge,
  Heading,
  HStack,
  Radio,
  RadioGroup,
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

const SensorDisplay = ({ sensorData }) => {
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");

  return (
    <VStack w="100%">
      <HStack my={4} ml={16} float="left" color={textColor} w="80%">
        <Heading size="lg">SENSOR STREAM</Heading>
        <Spacer />
      </HStack>
      <Wrap justify="space-evenly" w="100%">
        {sensorData ? (
          sensorData.map((sensor, idx) => (
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
