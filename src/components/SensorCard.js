import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const SensorCard = (props) => {
  const { name, value } = props.data;
  return (
    <Stat
      px={{ base: 4, sm: 6 }}
      py="5"
      bg={mode("white", "gray.700")}
      shadow="base"
      rounded="lg"
    >
      <StatLabel
        fontWeight="medium"
        isTruncated
        color={mode("gray.500", "gray.400")}
      >
        {name}
      </StatLabel>
      <StatNumber
        fontSize="3xl"
        fontWeight="medium"
        color={mode("gray.900", "white")}
      >
        {value}
      </StatNumber>
    </Stat>
  );
};
