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
  return [{name: "depth", value: v*(-1)}, {name: "roll", value: v*(-1)}]
};

const SensorDisplay = () => {

  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");
  
  const [tick, setTick] = useState(0);
  const [newData, setNewData] = useState([]);
  const [counter, setCounter] = useState(0);
  
  const { addResponse } = useContext(CommandResponseContext);
  const { changeReference, addChartData, resetChartData, clearAndSetChartMode} = useContext(ChartContext);
  
  const rollMode = "roll";
  const depthMode = "depth";
  const defaultMode = "default";
  const [optionMode, setOptionMode] = useState(defaultMode);
  
  const dispatchChartData = (data) => {
    for (let i = 0; i < data.length; i++) {
      const sensor = data[i];
      if (optionMode === rollMode) {
        if (sensor.name === rollMode) {
          sensor.counter = counter;
          addChartData(sensor);
        }
      } else if (optionMode === depthMode) {
        if (sensor.name === depthMode) {
          sensor.counter = counter;
          addChartData(sensor);
        }
      }
    }
  };
      
  useEffect(() => {
    switch (optionMode) {

      case defaultMode:
        clearAndSetChartMode("default");
        break;

      case rollMode:
        clearAndSetChartMode("surface");
        changeReference("surface", 0)
        break;

      case depthMode:
        clearAndSetChartMode("set_point_depth");
        changeReference("set_point_depth", -10);
        break;
    
      default:
        break;
    }
  }, [optionMode])


  useEffect(() => {
      const timer = setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(tick => tick + 1);
      let objs = singleData(tick);
      setNewData(objs);
      dispatchChartData(objs);
    }, 100);

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
  //       switch (name) {

  //         case "sensor_data":
  //           setNewData(data);
  //           break;
          
  //         case "response":
  //           addNewResponse(data);
  //           break;
        
  //         default:
  //           break;
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

  const addNewResponse = (payload_data) => {
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
