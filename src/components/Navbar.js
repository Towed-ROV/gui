import React from "react";
import {
  Flex,
  Stack,
  Box,
  useColorMode,
  IconButton,
  Image,
  Text,
  Button,
  Avatar,
  Link,
  AspectRatio,
} from "@chakra-ui/react";

import ntnuLogo from "../assets/ntnu.png";

const Navbar = () => {
  return (
    <Flex
      bg="rov.cyaner"
      h="8em"
      mx="20"
      my="10"
      align="center"
      justifyContent="space-between"
    >
      <Box>
        <Image h="3vh" src={ntnuLogo} alt="NTNU" />
      </Box>
      <Flex>
        <Link fontWeight="bold" pr={16} fontSize="3xl">
          Home
        </Link>
        <Link fontWeight="bold" pr={16} fontSize="3xl">
          Dashboard
        </Link>
        <Link fontWeight="bold" pr={16} fontSize="3xl">
          Map
        </Link>
      </Flex>
      <Flex>
        <Button size="lg" bg="#000000" color="white" variant="solid">
          Settings
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
