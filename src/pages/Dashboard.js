import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  useColorModeValue,
  Switch,
  VStack,
  Text,
  FormLabel,
  Badge,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";
import { CommandResponseProvider } from "../components/CommandResponseProvider";
import SystemControl from "../components/SystemControl";
import ChartDisplay from "../components/ChartDisplay";
import { ChartDataProvider } from "../components/ChartDataProvider";

const Dashboard = () => {

  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      h="92vh"
      mx="1vw"
      my="1vh"
      color={boxColor}
      alignContent="center"
      justifyContent="center"
    >
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
          {/* <ChartDataProvider> */}
            <GridItem
              bg={boxColor}
              boxShadow="dark-lg"
              rounded="lg"
              p={2}
              colSpan={7}
              rowSpan={3}
              >
              <SensorDisplay />
            </GridItem>
            <GridItem
              bg={boxColor}
              boxShadow="dark-lg"
              rounded="lg"
              p={2}
              colSpan={7}
              rowSpan={3}
              >
              {/* <ChartDisplay /> */}
            </GridItem>
          {/* </ChartDataProvider> */}
        </Grid>
      </CommandResponseProvider>
    </Flex>
  );
};

export default Dashboard;
