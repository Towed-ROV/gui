import React from "react";
import {
  Flex,
  Box,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import ntnuLogo from "../assets/ntnu.png";

const Footer = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      as="nav"
      bg={boxColor}
      color={textColor}
      boxShadow="dark-lg"
      rounded="lg"
      h="4vh"
      mx="2vw"
      my="2vh"
      align="center"
      justifyContent="center"
      wrap="wrap"
    >
      <Box>
        <Image h="2vh" src={ntnuLogo} alt="NTNU" />
      </Box>
    </Flex>
  );
};

export default Footer;
