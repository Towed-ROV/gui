import {
  Flex,
  IconButton,
  useColorModeValue,
  VStack,
  Text,
  Link,
  Box,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Home = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  return (
    <Flex
      h="100vh"
      color={textColor}
      bg="rov.jpg"
      align="center"
      justify="center"
      bgImage="url('/rov_dark.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      backgroundClip="content-box"
    >
      <VStack>
        <Heading color="white" fontSize="5xl">
          TOWED ROV 2021
        </Heading>
      </VStack>
    </Flex>
  );
};

export default Home;
