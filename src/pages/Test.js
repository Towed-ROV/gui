import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
  useColorModeValue,
  GridItem,
  Divider,
  Switch,
  VStack,
  HStack,
  Button,
  Grid,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { SunIcon } from "@chakra-ui/icons";

const Test = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      h="92vh"
      mx="1vw"
      my="1vh"
      // bg={boxColor} color={textColor}
      >
      <Grid
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(14, 1fr)"
        gap={2}
        w="100%"
        h="100%"
      >
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={4}
        rowSpan={5}>
        <HStack p={6} justifyContent="space-evenly">
            <VStack>
              <Text color={textColor}>Connection</Text>
              <Spacer />
              <HStack>
                <Button color={textColor} size="md" bg="teal">
                  START
                </Button>
                <Button color={textColor} size="md" bg="teal">
                  STOP
                </Button>
              </HStack>
            </VStack>
            <VStack>
              <Text color={textColor}>Recording</Text>
              <Spacer />
              <Switch
                name="Status"
                onChange={toggleRecording}
                size="lg"
                colorScheme="green"
              >
                Connect
              </Switch>
            </VStack>
          </HStack>
          <SensorDisplay />
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={6}
        rowSpan={5}>
        <Flex justify="center" align="center">
            <VideoDisplay />
        </Flex>
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={4}
        rowSpan={5}>
          <Flex w="100%">
            MESSAGE BOX
          </Flex>
          <NumberFormField />
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={7}
        rowSpan={3}>
        <VStack p={12} spacing="30px" align="stretch">
            <Box>
              <Heading>AUTO MODE</Heading>
              <Switch size="lg" />
            </Box>
            <Box>
              <Heading>DEPTH REGULATION</Heading>
              <Switch size="lg" />
            </Box>
            <Box>
              <Heading>Lights</Heading>
              <Switch size="lg" />
            </Box>

            <Divider />
          </VStack>
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={7}
        rowSpan={3}>
        <Flex w="100%">
        CHART DISPLAY
        </Flex>
      </GridItem>
      </Grid>
    </Flex>
  );
};

export default Test;
