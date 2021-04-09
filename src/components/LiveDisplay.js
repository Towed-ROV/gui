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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CommandResponseContext } from "./CommandResponseProvider";
import ChartDisplay from "./ChartDisplay";
import SensorDisplay from "./SensorDisplay";

const LiveDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");
  const [sensorData, setSensorData] = useState([]);
  const { addResponse } = useContext(CommandResponseContext);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sensors/stream");
    eventSource.addEventListener("open", (e) => {
      setIsConnected(true);
      setIsConnectedText("Connected");
    });
    eventSource.addEventListener("stream", (event) => {
      try {
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        switch (name) {
          case "sensor_data":
            setSensorData(data);
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
  }, []);

  const ROLL_MODE = "roll";
  const DEPTH_MODE = "depth";
  const DEFAULT_MODE = "None";
  const [optionMode, setOptionMode] = useState(DEFAULT_MODE);

  // const stopCanSendAngle = () => {
  //   if (canSendAngle) {
  //     sendCameraAngle(cameraAngle);
  //   }
  //   setCanSendAngle(false);
  // };

  // const startRemoteConnection = () => {
  //   sendCommand("start_system", true, true);
  //   addCommand({ name: "start_system", value: true });
  // };

  // const stopRemoteConnection = () => {
  //   sendCommand("start_system", false, true);
  //   addCommand({ name: "start_system", value: false });
  // };

  // const sendResetCommand = () => {
  //   sendCommand("reset", true, true);
  //   addCommand({ name: "reset", value: true });
  // };

  // const sendKillCommand = () => {
  //   sendCommand("emergency_surface", true, true);
  //   addCommand({ name: "emergency_surface", value: true });
  // };

  // const sendCameraAngle = (angle) => {
  //   sendCommand("camera_offset_angle", angle, false);
  //   addCommand({ name: "camera_offset_angle", value: angle });
  // };

  // const lightsOn = () => {
  //   sendCommand("lights_on_off", true, true);
  //   addCommand({ name: "lights_on_off", value: true });
  // };

  // const lightsOff = () => {
  //   sendCommand("lights_on_off", false, true);
  //   addCommand({ name: "lights_on_off", value: false });
  // };

  // const toggleAutoMode = () => {
  //   setAutoMode(!autoMode);
  //   sendCommand("auto_mode", !autoMode, true);
  //   addCommand({ name: "auto_mode", value: !autoMode });
  // };

  // const toggleDepthOrFloor = () => {
  //   setIsDepthMode(!isDepthMode);
  //   sendCommand("depth_or_seafloor", !isDepthMode, true);
  //   addCommand({ name: "depth_or_seafloor", value: !isDepthMode });
  // };

  // const searchComPorts = () => {
  //   sendCommand("com_port_search", true, true);
  //   addCommand({ name: "com_port_search", value: true });
  // };

  return (
    <Flex h="100%" w="100%">
      <Grid
        columns={2}
        bg={boxColor}
        p={2}
        templateColumns="repeat(30, 1fr)"
        templateRows="repeat(1, 1fr)"
        h="100%"
        w="100%"
      >
        <GridItem bg={boxColor} h="95%" w="100%" colSpan={14} rowSpan={1}>
          <SensorDisplay sensorData={sensorData} />
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg={boxColor}
          h="95%"
          w="100%"
          alignItems="center"
          justifyItems="center"
        >
          <VStack w="100%" align="center" mt="5rem">
            <Text variant="solid" fontSize="xl" color={textColor}>
              CHART MODE
            </Text>
            <RadioGroup
              w="100%"
              bg={boxColor}
              color={textColor}
              onChange={setOptionMode}
              value={optionMode}
            >
              <VStack spacing="8">
                <Radio isInvalid colorScheme="red" value={DEFAULT_MODE}>
                  <Text fontSize="lg">None</Text>
                </Radio>
                <Radio
                  fontSize="lg"
                  isInvalid
                  colorScheme="red"
                  value={DEPTH_MODE}
                >
                  <Text fontSize="lg">Depth</Text>
                </Radio>
                <Radio
                  fontSize="lg"
                  isInvalid
                  colorScheme="red"
                  value={ROLL_MODE}
                >
                  <Text fontSize="lg">Roll</Text>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </GridItem>
        <GridItem bg={boxColor} h="95%" w="100%" colSpan={14} rowSpan={1}>
          <ChartDisplay sensorData={sensorData} chartMode={optionMode} />
        </GridItem>
      </Grid>
    </Flex>
  );
};
export default LiveDisplay;
