import React, { useState } from "react";
import {
  Flex,
  Box,
  Link,
  useColorMode,
  IconButton,
  useColorModeValue,
  Drawer,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { HamburgerIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = (props) => {
  const { toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("top");

  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600"); // ("gray.200", "gray.600");

  const menuButtonTextColor = useColorModeValue("white", "gray.900");
  const menuButtonColor = useColorModeValue("gray.600", "gray.200"); // ("gray.200", "gray.600");

  return (
    <Flex
      bg="transparent"
      boxShadow="none"
      position="fixed"
      h="4vh"
      align="center"
      wrap="wrap"
      {...props}
      pl={2}
      pt={4}
      zIndex={500} // kinda hacky:) TODO: do better
    >
      <IconButton
        onClick={onOpen}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        color={menuButtonTextColor}
        bg={menuButtonColor}
      />
      <Drawer
        placement={placement}
        onClose={onClose}
        isOpen={isOpen}
        returnFocusOnClose={true}
        w="100%"
      >
        <DrawerOverlay>
          <DrawerContent bg={boxColor}>
            <DrawerHeader borderBottomWidth="1px">
              <Text fontWeight="bold" float="left" color={textColor}>
                Towed ROV 2021 🛥️
              </Text>
              <Text as="cite" float="right" color={textColor}>
                "Champions keep playing until they get it right."
              </Text>
            </DrawerHeader>
            <DrawerBody w="100%" bg={boxColor}>
              <Flex
                as="nav"
                bg={boxColor}
                color={textColor}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
                  >
                    Map
                  </Link>
                </Flex>
                <Flex marginRight={4}>
                  <IconButton
                    size="md"
                    aria-label="Change colormode"
                    onClick={() => {
                      toggleColorMode();
                      onClose();
                    }}
                    icon={<SunIcon />}
                    bg={boxColor}
                    color={textColor}
                  />
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
