import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Nav = (props) => {
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
      bg="rov.darker"
      color="rov.light"
      {...props}
    >
      <Flex
        align="center"
        width={{ base: "100%", md: "auto" }}
        justifyContent={{ base: "space-between", md: "flex-start" }}
      ></Flex>

      <Box
        display={{ base: "block", md: "flex" }}
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
      >
        <MenuItems>
          <Link to="/dashboard">Dashboard</Link>
        </MenuItems>
        <MenuItems>
          <Link to="/map">Map</Link>
        </MenuItems>
      </Box>
    </Flex>
  );
};

export default Nav;
