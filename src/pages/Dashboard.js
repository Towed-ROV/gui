import React from "react";
import { Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import NumberFormField from "../components/NumberFormField";
import { CommandResponseProvider } from "../components/CommandResponseProvider";
import SystemControl from "../components/SystemControl";
import LiveDisplay from "../components/LiveDisplay";

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex h="100vh" color={boxColor} bg={boxColor}>
      <CommandResponseProvider>
        <Grid
          templateRows="repeat(8, 1fr)"
          templateColumns="repeat(14, 1fr)"
          w="100%"
          h="100%"
        >
          <GridItem p={2} bg={boxColor} colSpan={4} rowSpan={5}>
            <SystemControl />
          </GridItem>
          <GridItem p={2} bg={boxColor} colSpan={6} rowSpan={5}>
            <VideoDisplay />
          </GridItem>
          <GridItem p={2} bg={boxColor} colSpan={4} rowSpan={5}>
            <NumberFormField />
          </GridItem>
          <GridItem p={2} bg={boxColor} colSpan={14} rowSpan={3}>
            <LiveDisplay />
          </GridItem>
        </Grid>
      </CommandResponseProvider>
    </Flex>
  );
};

export default Dashboard;
