import {
  Box,
  Image,
  Flex,
  useColorModeValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  Center,
  Icon,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import offlineImage from "../assets/offline.png";
import loadIMG from "../assets/loading.gif";
import { CommandResponseContext } from "./CommandResponseProvider";
import { sendCommand, takeSnapshot, toggleVideo } from "../db/crud";

import { MdSend } from "react-icons/md";
import { SiSonarsource } from "react-icons/si";
import { FiGitCommit, FiSun, FiCamera } from "react-icons/fi";
import { AiFillCamera } from "react-icons/ai";
import { VscDebugStart, VscDebugPause } from "react-icons/vsc";
import { Prompt } from "react-router";
import { VIDEO_LIVE_STREAM } from "../db/config";

const VideoDisplay = () => {
  const { addCommand } = useContext(CommandResponseContext);

  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const [isConnected, setIsConnected] = useState(false);
  const [source, setSource] = useState(offlineImage);
  const [displayMode, setDisplayMode] = useState("video"); // vidoe or sonar

  const [lightsOn, setLightsOn] = useState(false);
  const [cameraAngle, setCameraAngle] = useState(0);
  const camAngleRef = useRef();

  const handleVideoConnection = async (selectedMode = undefined) => {
    // If we call this method without args it refers to "STOP" whathever mode is selected
    // otherwise, we use the arg input to "START"

    if (selectedMode === undefined) {
      // Use the one stord in displayMode
      setIsConnected(!isConnected);
      await toggleVideo(!isConnected, displayMode);
    } else {
      setIsConnected(!isConnected);
      await toggleVideo(!isConnected, selectedMode);

      // then, update our new selected displayMode
      setDisplayMode(selectedMode);
    }
    if (!isConnected) setSource(VIDEO_LIVE_STREAM);
    if (isConnected) setSource(offlineImage);
  };

  const toggleLights = async () => {
    if (lightsOn) {
      sendCommand("lights_on_off", true, true);
      addCommand({ name: "lights_on_off", value: true });
    } else {
      sendCommand("lights_on_off", false, true);
      addCommand({ name: "lights_on_off", value: false });
    }
    // TOGGLE
    setLightsOn(!lightsOn);
  };

  const sendCameraAngle = () => {
    sendCommand("camera_offset_angle", cameraAngle, false);
    addCommand({ name: "camera_offset_angle", value: cameraAngle });
  };

  useEffect(() => {
    console.log(displayMode);
  }, [displayMode]);

  return (
    <VStack bg="black" h="100%" boxShadow="dark-lg" spacing={0}>
      <Prompt
        when={isConnected}
        message="Camera still running, please close it."
      />
      <Spacer />
      <Box h="550px" w="100%">
        <Image
          h="100%"
          w="100%"
          objectFit="cover"
          src={source}
          fallbackSrc={loadIMG}
          alt="noVideo"
        />
      </Box>
      <Flex
        color={textColor}
        h="5vh"
        align="center"
        justifyContent="space-between"
        wrap="wrap"
        w="100%"
        maxW="640px"
      >
        {!isConnected ? (
          <Menu placement="top">
            <MenuButton pr={16} bg="teal" color="white" px={4} h={8} ml={10}>
              <Icon as={VscDebugStart} mr={2} />
              Start
            </MenuButton>
            <MenuList bg="black" border="0px" py={2}>
              <Center>
                <MenuItem
                  bg="teal"
                  w="40%"
                  h={8}
                  color="white"
                  onClick={() => {
                    handleVideoConnection("video");
                  }}
                >
                  <Icon as={FiCamera} mr={2} />
                  Video
                </MenuItem>
              </Center>
              <Center>
                <MenuItem
                  bg="teal"
                  w="40%"
                  h={8}
                  color="white"
                  onClick={() => {
                    handleVideoConnection("sonar");
                  }}
                >
                  <Icon as={SiSonarsource} mr={2} />
                  Sonar
                </MenuItem>
              </Center>
            </MenuList>
          </Menu>
        ) : (
          <Box
            pr={16}
            as="button"
            bg="teal"
            color="white"
            px={4}
            h={8}
            ml={10}
            onClick={() => handleVideoConnection()} // we dont use param, so we stop whatevers already set
          >
            <Icon as={VscDebugPause} mr={2} />
            STOP
          </Box>
        )}
        <Box
          pr={16}
          as="button"
          onClick={() => takeSnapshot()}
          bg="teal"
          color="white"
          px={4}
          h={8}
        >
          <Icon as={AiFillCamera} mr={2} />
          SNAP
        </Box>
        <Box
          pr={16}
          as="button"
          bg="teal"
          color="white"
          px={4}
          h={8}
          onClick={() => toggleLights()}
        >
          <Icon as={FiSun} mr={2} />
          LIGHTS
        </Box>
        <Popover placement="top-start" initialFocusRef={camAngleRef}>
          <PopoverTrigger>
            <Box as="button" bg="teal" color="white" px={4} h={8} mr={10}>
              <Icon as={FiGitCommit} mr={2} />
              ANGLE
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Center>
                <Slider
                  id="camera-angle-slider"
                  aria-label="adjust-camera-angle"
                  onChange={(value) => setCameraAngle(value)}
                  defaultValue={0}
                  min={-10}
                  max={10}
                  step={1}
                  w="70%"
                  colorScheme="green"
                >
                  <SliderTrack bg="red.100">
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={8} ref={camAngleRef}>
                    {cameraAngle}
                  </SliderThumb>
                </Slider>
                <IconButton
                  mx={2}
                  colorScheme="green"
                  size="sm"
                  aria-label="send-camAngle"
                  onClick={() => sendCameraAngle()}
                  icon={<Icon as={MdSend} />}
                />
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </VStack>
  );
};

export default VideoDisplay;
