import React, { useContext } from "react";
import {
  Flex,
  Box,
  Image,
  Button,
  Link,
  useColorMode,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import ntnuLogo from "../assets/ntnu.png";
import { SettingsIcon, SunIcon } from "@chakra-ui/icons";
import { SettingsContext } from "./SettingsProvider";

const Navbar = (props) => {
  const { toggleColorMode } = useColorMode();

  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const { sensorSettings } = useContext(SettingsContext);

  return (
    <Flex
      as="nav"
      bg={boxColor}
      color={textColor}
      boxShadow="dark-lg"
      rounded="lg"
      h="4vh"
      mx="1vw"
      my="1vh"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      {...props}
    >
      <Box marginLeft={4}>
        <IconButton
          as={ReactRouterLink}
          to="/settings"
          size="md"
          aria-label="To settings"
          icon={<SettingsIcon />}
          bg={boxColor}
          color={textColor}
        />
      </Box>
      <Flex>
        <Link
          as={ReactRouterLink}
          to="/"
          pr={16}
          fontSize="2xl"
          bg={boxColor}
          color={textColor}
        >
          Home
        </Link>
        <Link
          as={ReactRouterLink}
          to="/dashboard"
          pr={16}
          fontSize="2xl"
          bg={boxColor}
          color={textColor}
        >
          Dashboard
        </Link>
        <Link
          as={ReactRouterLink}
          to="/map"
          pr={16}
          fontSize="2xl"
          bg={boxColor}
          color={textColor}
        >
          Map
        </Link>
        <Link
          as={ReactRouterLink}
          to="/test"
          pr={16}
          fontSize="2xl"
          bg={boxColor}
          color={textColor}
        >
          Test
        </Link>
      </Flex>
      <Flex marginRight={4}>
        <IconButton
          size="md"
          aria-label="Change colormode"
          onClick={toggleColorMode}
          icon={<SunIcon />}
          bg={boxColor}
          color={textColor}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
