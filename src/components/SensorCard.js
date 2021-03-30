import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";

export const SensorCard = (props) => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Stat
      px={{ base: 2, sm: 2 }}
      py="2"
      color={textColor}
      boxShadow="dark-lg"
      rounded="lg"
      minWidth="150px"
    >
      <StatLabel variant="bold" fontSize="md" color={textColor}>
        {props.sensor.name}
      </StatLabel>
      <StatNumber fontSize="md" fontWeight="large" color={textColor}>
        {props.sensor.value}
      </StatNumber>
    </Stat>
  );
};
