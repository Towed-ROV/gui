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
  return [
    { name: "depth", value: v },
    { name: "roll", value: v },
  ];
};

const SensorDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  const [tick, setTick] = useState(0);
  const [counter, setCounter] = useState(0);

  const [newData, setNewData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { addResponse } = useContext(CommandResponseContext);
  const { changeReference, addChartData, clearAndSetChartMode } = useContext(
    ChartContext
  );

  const ROLL_MODE = "roll";
  const DEPTH_MODE = "depth";
  const DEFAULT_MODE = "default";
  const [optionMode, setOptionMode] = useState(DEFAULT_MODE);

  // const dispatchChartData = (data) => {
  //   let item = undefined;
  //   if (optionMode === ROLL_MODE) {
  //     item = data.filter((sensor) => sensor.name == ROLL_MODE)[0];
  //   } else if (optionMode === DEPTH_MODE) {
  //     item = data.filter((sensor) => sensor.name == DEPTH_MODE)[0];
  //   }
  //   if (item) {
  //     addChartData(item);
  //   }
  // };

  useEffect(() => {
    switch (optionMode) {
      case DEFAULT_MODE:
        clearAndSetChartMode("default");
        break;

      case ROLL_MODE:
        clearAndSetChartMode("surface");
        changeReference("surface", 0);
        break;

      case DEPTH_MODE:
        clearAndSetChartMode("set_point_depth");
        changeReference("set_point_depth", 10);
        break;

      default:
        break;
    }
  }, [optionMode]);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTick(tick => tick + 1);
  //     let objs = singleData(tick);
  //     setNewData(objs);
  //     dispatchChartData(objs);
  //   }, 100);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [tick]);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sensors/data");

    eventSource.addEventListener("open", (e) => {
      setIsConnected(true);
      setIsConnectedText("Connected");
      console.log("The connection has been established.");
    });

    eventSource.addEventListener("data", (event) => {
      try {
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        switch (name) {
          case "sensor_data":
            setNewData(data);
            if (optionMode === ROLL_MODE) {
              let item = data.filter((sensor) => sensor.name === ROLL_MODE)[0];
              item.counter = counter;
              addChartData(item);
            } else if (optionMode === DEPTH_MODE) {
              let item = data.filter((sensor) => sensor.name === DEPTH_MODE)[0];
              item.counter = counter;

              addChartData({ ...item, counter: counter });
            }
            break;

          case "response":
            data.map((resp) => addResponse(resp));
            break;

          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });
    eventSource.addEventListener("close", (e) => {
      setIsConnected(false);
      setIsConnectedText("Disconnected");
      eventSource.close();
    });
    return () => eventSource.close();
  }, [optionMode]);

  return (
    <VStack w="100%">
      <HStack my={4} ml={16} float="left" color={textColor} w="80%">
        <Heading>Sensordisplay</Heading>
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
        <Badge variant="solid" fontSize="md" colorScheme="teal">
          CHARTs
        </Badge>
        <RadioGroup
          bg={boxColor}
          color={textColor}
          onChange={setOptionMode}
          value={optionMode}
        >
          <Stack direction="row">
            <Radio isInvalid colorScheme="red" value={DEFAULT_MODE}>
              None
            </Radio>
            <Radio isInvalid colorScheme="red" value={DEPTH_MODE}>
              Depth
            </Radio>
            <Radio isInvalid colorScheme="red" value={ROLL_MODE}>
              Roll
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>
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
