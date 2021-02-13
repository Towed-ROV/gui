import {
  Flex,
  Stack,
  useColorMode,
  IconButton,
  Box,
  Image,
} from "@chakra-ui/react";
import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      w="100vw"
      bg="rov.cyaner"
      align="center"
      justify="center"
      fontSize={["md", "lg", "xl", "xl"]}
      h="7vh"
      boxShadow="md"
      p={2}
    >
      <Flex w={["100vw", "100vw", "80vw", "80vw"]} justify="space-around">
        <Stack spacing={8} justify="center" align="center" isInline>
          <Box position="relative"></Box>
          <Box position="relative">HEY</Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
