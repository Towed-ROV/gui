import {
  Badge,
  Box,
  Center,
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
import { dummyData } from "../fake_db/settings";
import { CommandResponseContext } from "./CommandResponseProvider";
import { SensorCard } from "./SensorCard";

const SensorDisplay = ({ sensorData }) => {
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");

  return (
    <VStack w="100%" h="100%">
      <Center my={4} color={textColor} alig="center" justifContent="center">
        <Heading alig="center" justifContent="center" size="lg">
          SENSOR STREAM
        </Heading>
      </Center>
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
