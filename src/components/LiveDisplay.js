import {
  Flex,
  Grid,
  GridItem,
  Text,
  Radio,
  RadioGroup,
  useColorModeValue,
  VStack,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CommandResponseContext } from "./CommandResponseProvider";
import SensorDisplay from "./SensorDisplay";
import Chart from "./Chart";
import Minimap from "./Minimap";

const LiveDisplay = () => {
  const { addResponse } = useContext(CommandResponseContext);
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const ROLL_MODE = "roll";
  const DEPTH_MODE = "depth";
  const DEFAULT_MODE = "None";
  const [optionMode, setOptionMode] = useState(DEFAULT_MODE);
  const [displayMode, setDisplayMode] = useState("plot");

  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // let eventSource = new EventSource("http://localhost:8000/sensors/stream");
    // eventSource.addEventListener("open", (e) => {
    //   setIsConnected(true);
    //   setIsConnectedText("Connected");
    // });
    // eventSource.addEventListener("stream", (event) => {
    //   try {
    //     // @ts-ignore
    //     let payload = JSON.parse(event.data);
    //     let name = payload.payload_name;
    //     let data = payload.payload_data;
    //     switch (name) {
    //       case "sensor_data":
    //         setSensorData(data);
    //         break;
    //       case "response":
    //         data.map((resp) => addResponse(resp));
    //         break;
    //       default:
    //         break;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
    // eventSource.addEventListener("close", (e) => {
    //   setIsConnected(false);
    //   setIsConnectedText("Disconnected");
    //   eventSource.close();
    // });
    // return () => eventSource.close();
  }, []);

  return (
    <Grid
      id="grid"
      bg={boxColor}
      templateColumns="repeat(2, 1fr)"
      w="100%"
      h="100%"
    >
      <GridItem bg={boxColor} color={textColor} colSpan={1}>
        <SensorDisplay sensorData={sensorData} />
      </GridItem>

      <GridItem color={textColor} bg={boxColor} h="90%" colSpan={1}>
        <HStack w="100%">
          {/* <Text variant="solid" fontSize="xl" color={textColor}>
            Visualization
          </Text> */}
          <RadioGroup
            ml={40}
            mr={40}
            onChange={setDisplayMode}
            value={displayMode}
          >
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
              color={textColor}
              onChange={setOptionMode}
              value={optionMode}
            >
              <Radio mr={6} colorScheme="red" value={DEFAULT_MODE}>
                <Text fontSize="lg">None</Text>
              </Radio>
              <Radio mr={6} fontSize="lg" colorScheme="red" value={DEPTH_MODE}>
                <Text fontSize="lg">Depth</Text>
              </Radio>
              <Radio fontSize="lg" colorScheme="red" value={ROLL_MODE}>
                <Text fontSize="lg">Roll</Text>
              </Radio>
            </RadioGroup>
          ) : (
            <Spacer />
          )}
        </HStack>
        {displayMode === "plot" ? (
          <Chart sensorData={sensorData} chartMode={optionMode} />
        ) : undefined}
        {displayMode === "map" ? <Minimap /> : undefined}
      </GridItem>
    </Grid>
  );
};
export default LiveDisplay;
