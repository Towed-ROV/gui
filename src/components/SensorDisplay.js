import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { ChartContext } from "./ChartProvider";
import { CommandResponseContext } from "./CommandResponseProvider";
import { SensorCard } from "./SensorCard";

const singleData = (v) => {
  return {name: "roll", value: v*(-1)}
};

const SensorDisplay = () => {
  const [newData, setNewData] = useState([]);
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  const { addResponse } = useContext(CommandResponseContext);
  const { changeConstant, addChartData } = useContext(ChartContext);

  const rollMode = "depth";
  const depthMode = "roll";
  const defaultMode = "default";
  const [optionMode, setOptionMode] = useState(defaultMode);
  
  const dispatchChartData = (data) => {
    data.map((sensor, index) => {
      if (optionMode == defaultMode) {
        // pass
      } else if (optionMode === rollMode) {
        if (sensor.name === rollMode) {
          
          addChartData(sensor);
        }
      } else if (optionMode === depthMode) {
        if (sensor.name === depthMode) {
          addChartData(sensor);
        }
      };
    });
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

  const [tick, setTick] = useState(0);

    

    useEffect(() => {
      const timer = setInterval(() => {
        setTick(tick => tick + 1);
        let obj = singleData(tick);
        addChartData(obj);
        setNewData([obj]);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, [tick]);

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
      <HStack  my={4} ml={16} float="left" color={textColor} w="80%">
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
        <Spacer />
        <Badge
          variant="solid"
          fontSize="md"
          colorScheme="teal"
        >
          CHARTs 
        </Badge>
        <RadioGroup bg={boxColor} color={textColor} onChange={setOptionMode} value={optionMode}>
          <Stack direction="row">
            <Radio isInvalid colorScheme="red" value={defaultMode}>None</Radio>
            <Radio isInvalid colorScheme="red" value={depthMode}>Depth</Radio>
            <Radio isInvalid colorScheme="red" value={rollMode}>Roll</Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <Text></Text>
      <Wrap justify="space-evenly" w="100%">
        {newData ? (
          newData.map((sensor, idx) => (
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
