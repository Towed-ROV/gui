import {
  Box,
  Button,
  Image,
  Flex,
  Text,
  Switch,
  useColorModeValue,
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
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const VIDEO_STREAM = "http://localhost:8000/videos/video";
  const [isConnected, setIsConnected] = useState(false);
  const [source, setSource] = useState(offlineImage);

  const handleConnection = async (e) => {
    setIsConnected(!isConnected);
    await toggleVideo(!isConnected);
    if (!isConnected) setSource(VIDEO_STREAM);
    if (isConnected) setSource(offlineImage);
  };

  return (
    <Flex>
      <Box p="2" bg={boxColor}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          d="flex"
          mt="2"
          p="2"
          letterSpacing="wide"
          bg="rov.light"
        >
          <Text fontSize="xl" color={textColor}>
            Connection: {isConnected.toString()}
          </Text>
          <Button onClick={takeSnapshot}>Snap</Button>
          <Switch onChange={handleConnection} size="lg" colorScheme="green">
            Connect
          </Switch>
        </Box>
        <Flex w="640px" h="480px">
          <Image src={source} fallbackSrc={loadIMG} alt="noVideo" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default VideoDisplay;
