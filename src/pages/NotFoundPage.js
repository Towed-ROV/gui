import {
  Flex,
  Link,
  useColorModeValue,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const NotFoundPage = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  return (
    <Flex
      h="100vh"
      color={textColor}
      bg={boxColor}
      align="center"
      justify="center"
    >
      <VStack>
        <Text fontSize="3xl">404 - Not Found!</Text>
        <Link as={ReactRouterLink} to="/">
          <Button colorScheme="teal">Go home</Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default NotFoundPage;
