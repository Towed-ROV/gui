import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import NumberFormField from "../components/NumberFormField";
import { CommandResponseProvider } from "../components/CommandResponseProvider";
import SystemControl from "../components/SystemControl";
import LiveDisplay from "../components/LiveDisplay";

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <VStack h="92vh" mx="1vw" my="1vh" color={boxColor}>
      <CommandResponseProvider>
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
            rowSpan={5}
          >
            <SystemControl />
          </GridItem>
          <GridItem
            bg={boxColor}
            boxShadow="dark-lg"
            rounded="lg"
            colSpan={6}
            rowSpan={5}
          >
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
            rowSpan={5}
          >
            <NumberFormField />
          </GridItem>
          <GridItem boxShadow="dark-lg" rounded="lg" colSpan={14} rowSpan={3}>
            <LiveDisplay />
          </GridItem>
        </Grid>
      </CommandResponseProvider>
    </VStack>
  );
};

export default Dashboard;
