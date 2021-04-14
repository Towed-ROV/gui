import {
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Slider,
  Switch,
  Spacer,
  Box,
  useColorModeValue,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { sendCommand, toggleRecording } from "../fake_db/crud";
import { CommandResponseContext } from "./CommandResponseProvider";

const SystemControl = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const { addCommand } = useContext(CommandResponseContext);

  const [autoMode, setAutoMode] = useState(false);
  const [isDepthMode, setIsDepthMode] = useState(false);
  const [cameraAngle, setCameraAngle] = useState(0);
  const [canSendAngle, setCanSendAngle] = useState(false);
  const startCanSendAngle = () => {
    setCanSendAngle(true);
  };

  // @TODO: improve the addition of addings commands to display box

  const stopCanSendAngle = () => {
    if (canSendAngle) {
      sendCameraAngle(cameraAngle);
    }
    setCanSendAngle(false);
  };

  const startRemoteConnection = () => {
    sendCommand("start_system", true, true);
    addCommand({ name: "start_system", value: true });
  };

  const stopRemoteConnection = () => {
    sendCommand("start_system", false, true);
    addCommand({ name: "start_system", value: false });
  };

  const sendResetCommand = () => {
    sendCommand("reset", true, true);
    addCommand({ name: "reset", value: true });
  };

  const sendKillCommand = () => {
    sendCommand("emergency_surface", true, true);
    addCommand({ name: "emergency_surface", value: true });
  };

  const sendCameraAngle = (angle) => {
    sendCommand("camera_offset_angle", angle, false);
    addCommand({ name: "camera_offset_angle", value: angle });
  };

  const lightsOn = () => {
    sendCommand("lights_on_off", true, true);
    addCommand({ name: "lights_on_off", value: true });
  };

  const lightsOff = () => {
    sendCommand("lights_on_off", false, true);
    addCommand({ name: "lights_on_off", value: false });
  };

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
    sendCommand("auto_mode", !autoMode, true);
    addCommand({ name: "auto_mode", value: !autoMode });
  };

  const toggleDepthOrFloor = () => {
    setIsDepthMode(!isDepthMode);
    sendCommand("depth_or_seafloor", !isDepthMode, true);
    addCommand({ name: "depth_or_seafloor", value: !isDepthMode });
  };

  const searchComPorts = () => {
    sendCommand("com_port_search", true, true);
    addCommand({ name: "com_port_search", value: true });
  };

  return (
    <VStack p={6} justifyContent="space-evenly" h="100%" bg={boxColor}>
      <Heading color={textColor}>SYSTEM</Heading>
      <HStack>
        <Button
          id="connection-button"
          color={textColor}
          onClick={startRemoteConnection}
          bg="green.400"
          colorScheme="teal"
          size="md"
        >
          On
        </Button>
        <Button
          id="connection-button"
          color={textColor}
          onClick={stopRemoteConnection}
          bg="red.400"
          colorScheme="teal"
          size="md"
        >
          Off
        </Button>
      </HStack>
      <HStack>
        <Button
          id="reset-button"
          color={textColor}
          onClick={sendResetCommand}
          bg="yellow.200"
          size="md"
        >
          Reset
        </Button>
        <Button
          id="reset-button"
          color={textColor}
          onClick={searchComPorts}
          bg="orange.200"
          size="md"
        >
          Find ports
        </Button>
        <Button
          id="kill-button"
          color={textColor}
          onClick={sendKillCommand}
          bg="red"
          size="md"
        >
          E-STOP
        </Button>
      </HStack>
      <Text fontSize="xl" color={textColor}>
        Logging
      </Text>
      <Switch
        name="Status"
        onChange={toggleRecording}
        size="lg"
        colorScheme="green"
      />
      <Text fontSize="xl" color={textColor}>
        Auto mode
      </Text>
      <Switch
        onChange={(e) => toggleAutoMode()}
        size="lg"
        colorScheme="green"
      />
      <Text fontSize="xl" color={textColor}>
        Depth or Seafloor
      </Text>
      <Switch onChange={toggleDepthOrFloor} size="lg" colorScheme="green" />
      <Text fontSize="xl" color={textColor}>
        Lights
      </Text>
      <HStack>
        <Button color={textColor} bg="green.500" onClick={lightsOn}>
          On
        </Button>
        <Button color={textColor} bg="red.500" onClick={lightsOff}>
          Off
        </Button>
      </HStack>
      <Text fontSize="xl" color={textColor}>
        Camera angle
      </Text>
      <Slider
        id="camera-angle-slider"
        aria-label="adjust-camera-angle"
        onChange={(value) => setCameraAngle(value)}
        onChangeStart={(e) => startCanSendAngle()}
        onChangeEnd={(e) => stopCanSendAngle()}
        defaultValue={0}
        min={-10}
        max={10}
        step={1}
        w="50%"
        colorScheme="green"
      >
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text color={textColor}>{cameraAngle}</Text>
    </VStack>
  );
};

export default SystemControl;
