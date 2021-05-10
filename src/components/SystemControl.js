import {
  Switch,
  Box,
  useColorModeValue,
  Flex,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { sendCommand, sendSettingsCommand, toggleRecording } from "../db/crud";
import { CommandResponseContext } from "./CommandResponseProvider";
import { SettingsContext } from "./SettingsProvider";
import { FaPowerOff } from "react-icons/fa";
import { VscDebugRestart, VscDebugStart } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { GoAlert } from "react-icons/go";

const SystemControl = () => {
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const toast = useToast();

  const { addCommand } = useContext(CommandResponseContext);
  const { sensorSettings } = useContext(SettingsContext);

  const [autoMode, setAutoMode] = useState(false);
  const [isDepthMode, setIsDepthMode] = useState(false);
  const [sysRunning, setSysRunning] = useState(false);

  const toggleRemoteConnection = () => {
    if (sysRunning) {
      sendCommand("start_system", false, true);
      addCommand({ name: "start_system", value: false });
    } else {
      sendCommand("start_system", true, true);
      addCommand({ name: "start_system", value: true });
    }

    setSysRunning(!sysRunning);
  };

  const sendResetCommand = () => {
    sendCommand("reset", true, true);
    addCommand({ name: "reset", value: true });
  };

  const sendKillCommand = () => {
    sendCommand("emergency_surface", true, true);
    addCommand({ name: "emergency_surface", value: true });
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

  const sendSensorSettingsToRov = async () => {
    if (sensorSettings.length > 0) {
      sensorSettings.map(
        async (setting) =>
          await sendSettingsCommand(setting.name, setting.origin, setting.port)
      );
    } else {
      toast({
        title: `Settings information.`,
        position: "top",
        description: `Settings is empty`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      h="6vh"
      w="100%"
      bg={boxColor}
      boxShadow="dark-lg"
      justifyContent="space-evenly"
      align="center"
    >
      <Flex justifyContent="center" wrap="wrap" w="100%">
        <Box
          mr={6}
          as="button"
          bg="teal"
          color="white"
          px={4}
          minWidth="10rem"
          h={10}
          onClick={() => toggleRemoteConnection()} // startRemoteConnection, stopRemoteConnection
        >
          <Icon as={FaPowerOff} mr={2} color="white" />
          {!sysRunning ? "CONNECT" : "DISCONNECT"}
        </Box>
        <Box
          mr={6}
          minWidth="10rem"
          as="button"
          bg="teal"
          color="white"
          px={4}
          h={10}
          onClick={() => sendSensorSettingsToRov()}
        >
          <Icon as={VscDebugStart} mr={2} color="white" />
          SEND CONFIG
        </Box>
        <Box
          mr={6}
          minWidth="10rem"
          as="button"
          bg="teal"
          color="white"
          px={4}
          h={10}
          onClick={() => sendResetCommand()}
        >
          <Icon as={VscDebugRestart} mr={2} color="white" />
          RESET
        </Box>
        <Box
          mr={6}
          as="button"
          minWidth="10rem"
          bg="teal"
          color="white"
          px={4}
          h={10}
          onClick={() => searchComPorts()}
        >
          <Icon as={BsSearch} mr={2} color="white" />
          PORTS
        </Box>
      </Flex>
      <Flex justifyContent="center" wrap="wrap" w="100%">
        <Box
          flexDirection="row"
          mr={6}
          minWidth="10rem"
          bg="teal"
          color="white"
          px={4}
          h={10}
          align="center"
          pt={2}
        >
          <Switch
            mr={2}
            onChange={toggleRecording}
            size="md"
            colorScheme="green"
          />
          LOGGING
        </Box>

        <Box
          mr={6}
          minWidth="10rem"
          bg="teal"
          color="white"
          px={4}
          h={10}
          align="center"
          pt={2}
        >
          <Switch
            mr={2}
            onChange={(e) => toggleAutoMode()}
            size="md"
            colorScheme="green"
          />
          AUTO MODE
        </Box>

        <Box
          mr={6}
          minWidth="10rem"
          bg="teal"
          color="white"
          px={4}
          h={10}
          align="center"
          pt={2}
        >
          <Switch
            mr={2}
            onChange={toggleDepthOrFloor}
            size="md"
            colorScheme="green"
          />
          DEPTH MODE
        </Box>
        <Box
          mr={6}
          minWidth="10rem"
          as="button"
          bg="teal"
          color="white"
          px={4}
          h={10}
          onClick={() => sendKillCommand()}
        >
          <Icon as={GoAlert} mr={2} color="white" />
          E-STOP
        </Box>
      </Flex>
    </Flex>
  );
};

export default SystemControl;
