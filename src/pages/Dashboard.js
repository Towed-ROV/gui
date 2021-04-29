import React from "react";
import { Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import CommandResponse from "../components/CommandResponse";
import { CommandResponseProvider } from "../components/CommandResponseProvider";
import SystemControl from "../components/SystemControl";
import ChartMap from "../components/ChartMap";
import SensorDisplay from "../components/SensorDisplay";
import Session from "../components/Session";

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex h="100vh" color={textColor} bg={boxColor}>
      <CommandResponseProvider>
        <Grid
          templateRows="repeat(14, 1fr)"
          templateColumns="repeat(14, 1fr)"
          w="100%"
          h="100%"
        >
          <GridItem pt={1} px={1} pb={0} colSpan={14} rowSpan={1}>
            <SystemControl />
          </GridItem>
          <GridItem p={1} colSpan={4} rowSpan={8}>
            <SensorDisplay />
          </GridItem>
          <GridItem p={1} colSpan={6} rowSpan={8}>
            <VideoDisplay />
          </GridItem>
          <GridItem p={1} colSpan={4} rowSpan={8}>
            <CommandResponse />
          </GridItem>
          <GridItem p={1} colSpan={7} rowSpan={5}>
            <Session />
          </GridItem>
          <GridItem p={1} colSpan={7} rowSpan={5}>
            <ChartMap />
          </GridItem>
        </Grid>
      </CommandResponseProvider>
    </Flex>
  );
};

export default Dashboard;
