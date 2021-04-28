import {
  Flex,
  IconButton,
  useColorModeValue,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Home = () => {
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
        <Text fontSize="2xl">TOWED ROV 2021</Text>
        <Link isExternal={true} href="https://github.com/Towed-ROV">
          <IconButton
            colorScheme="teal"
            aria-label="Github"
            size="lg"
            href="www.google.no"
            icon={<ExternalLinkIcon />}
          />
        </Link>
      </VStack>
    </Flex>
  );
};

export default Home;
