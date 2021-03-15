import {
  Box,
  Button,
  Image,
  Flex,
  Switch,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import offlineImage from "../assets/offline.png";
import loadIMG from "../assets/loading.gif";

const toggleVideo = async (toggle) => {
  var url = "http://localhost:8000/videos/";
  if (toggle) {
    url += "video_start";
  } else {
    url += "video_stop";
  }
  await postSome(url);
};

const takeSnapshot = async () => {
  await postSome("http://localhost:8000/videos/video_snapshot");
};

const postSome = async (url) => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    console.log(await JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const VideoDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const VIDEO_STREAM = "http://localhost:8000/videos/video";
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedText, setIsConnectedText] = useState("Disconnected");

  const [source, setSource] = useState(offlineImage);

  const handleVideoConnection = async (e) => {
    setIsConnected(!isConnected);
    await toggleVideo(!isConnected);
    if (!isConnected) setSource(VIDEO_STREAM);
    if (isConnected) setSource(offlineImage);
  };

  useEffect(() => {
    if (isConnected) {
      setIsConnectedText("Connected");
    } else {
      setIsConnectedText("Disconnected");
    }
  }, [isConnected]);

  return (
    <Box m={4} bg={boxColor}>
      <Flex bg="blue" align="center" justifyContent="space-between" mb={4}>
        <Flex align="center">
          <Badge
            color={textColor}
            minWidth="8em"
            fontSize="1em"
            colorScheme={isConnected ? "green" : "red"}
          >
            {isConnectedText}
          </Badge>
        </Flex>
        <Flex>
          <Button
            colorScheme="teal"
            isDisabled={!isConnected}
            onClick={takeSnapshot}
            mr={14}
            color={textColor}
          >
            Snap
          </Button>
        </Flex>
        <Flex>
          <Switch
            color={textColor}
            onChange={handleVideoConnection}
            size="lg"
            colorScheme="green"
          >
            Connect
          </Switch>
        </Flex>
      </Flex>
      <Flex align="center" justifyContent="center" bg="blue">
        <Image src={source} fallbackSrc={loadIMG} alt="noVideo" />
      </Flex>
    </Box>
  );
};

export default VideoDisplay;

// <Flex align="center" justifyContent="center" w="640px" h="480px"></Flex>
