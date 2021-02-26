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
      h="8vh"
      mx="2vw"
      my="2vh"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      {...props}
    >
      <Box marginLeft={4}>
        <IconButton
          as={ReactRouterLink}
          to="/settings"
          size="lg"
          aria-label="To settings"
          icon={<SettingsIcon />}
          bg={boxColor}
          color={textColor}
        />
        Loaded: [{sensorSettings ? sensorSettings.length : 0}]
      </Box>
      <Flex>
        <Link
          as={ReactRouterLink}
          to="/"
          pr={16}
          fontSize="3xl"
          bg={boxColor}
          color={textColor}
        >
          Home
        </Link>
        <Link
          as={ReactRouterLink}
          to="/dashboard"
          pr={16}
          fontSize="3xl"
          bg={boxColor}
          color={textColor}
        >
          Dashboard
        </Link>
        <Link
          as={ReactRouterLink}
          to="/map"
          pr={16}
          fontSize="3xl"
          bg={boxColor}
          color={textColor}
        >
          Map
        </Link>
      </Flex>
      <Flex marginRight={4}>
        <IconButton
          size="lg"
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
