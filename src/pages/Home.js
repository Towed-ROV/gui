import { Flex, useColorModeValue, VStack, Heading } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
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
