import {
  Flex,
  HStack,
  Radio,
  Text,
  RadioGroup,
  Spacer,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useContext, useState } from "react";
import { CommandResponseContext } from "./CommandResponseProvider";
import Chart from "./Chart";
import Minimap from "./Minimap";

const ChartMap = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const ROLL_MODE = "roll";
  const DEPTH_MODE = "depth";
  const DEFAULT_MODE = "None";
  const [optionMode, setOptionMode] = useState(DEFAULT_MODE);
  const [displayMode, setDisplayMode] = useState("plot");

  return (
    <Box w="100%" h="90%" boxShadow="dark-lg" bg={boxColor}>
      <HStack
        w="100%"
        color={textColor}
        colSpan={1}
        ml={1}
        justifyContent="space-around"
      >
        <RadioGroup mt={2} onChange={setDisplayMode} value={displayMode}>
          <HStack>
            <Radio value="plot">
              {" "}
              <Text fontSize="lg">Plot</Text>
            </Radio>
            <Radio value="map">
              {" "}
              <Text fontSize="lg">Map</Text>
            </Radio>
          </HStack>
        </RadioGroup>
        {displayMode === "plot" ? (
          <RadioGroup
            mt={2}
            color={textColor}
            onChange={setOptionMode}
            value={optionMode}
          >
            <Radio mr={6} value={DEFAULT_MODE}>
              <Text fontSize="lg">None</Text>
            </Radio>
            <Radio mr={6} fontSize="lg" value={DEPTH_MODE}>
              <Text fontSize="lg">Depth</Text>
            </Radio>
            <Radio fontSize="lg" value={ROLL_MODE}>
              <Text fontSize="lg">Roll</Text>
            </Radio>
          </RadioGroup>
        ) : (
          <Spacer />
        )}
      </HStack>
      {displayMode === "plot" ? <Chart chartMode={optionMode} /> : undefined}
      {displayMode === "map" ? <Minimap /> : undefined}
    </Box>
  );
};

export default ChartMap;
