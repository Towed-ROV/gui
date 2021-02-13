import React from "react";
import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  Button,
  AspectRatio,
} from "@chakra-ui/react";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      w="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex
        align="center"
        width={{ base: "100%", md: "auto" }}
        justifyContent={{ base: "space-between", md: "flex-start" }}
      >
        <Image
          borderRadius="full"
          boxSize="50px"
          src="https://bit.ly/3qi6xXR"
          alt="Segun Adebayo"
        />
      </Flex>

      <Box
        display={{ base: "block", md: "flex" }}
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
      >
        <MenuItems>
          <Heading as="button" size="lg" letterSpacing={"-.1rem"}>
            Dashboard
          </Heading>
        </MenuItems>
        <MenuItems>
          <Heading as="button" size="lg" letterSpacing={"-.1rem"}>
            Map
          </Heading>
        </MenuItems>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Settings
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
