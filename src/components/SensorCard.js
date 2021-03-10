import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

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
      w="150px"
    >
      
      <StatLabel fontWeight="large" fontSize="md" isTruncated color={textColor}>
        {props.sensor.name}
      </StatLabel>
      <StatNumber fontSize="md" fontWeight="large" color={textColor}>
        {props.sensor.value}
      </StatNumber>
    </Stat>
  );
};
