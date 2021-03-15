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
} from "@chakra-ui/react";

import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";
import { CommandResponseProvider } from "../components/CommandResponseProvider";
import SystemControl from "../components/SystemControl";

const ddd = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  // const { sensorSettings } = useContext(SettingsContext);

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
            p={2}
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={200} height={100} data={ddd}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  stroke={textColor === "blackAlpha.900" ? "black" : "white"}
                  dataKey="name"
                />
                <YAxis
                  stroke={textColor === "blackAlpha.900" ? "black" : "white"}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </CommandResponseProvider>
    </Flex>
  );
};

export default Dashboard;

/**
 * 
 *  <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        w="100%"
        h="100%"
      >
        <GridItem
          bg={boxColor}
          boxShadow="dark-lg"
          rounded="lg"
          rowSpan={2}
          colSpan={1}
          color={textColor}
        >
          <Box as="section" bg={boxColor} p="2">
            <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
                {sensorSettings.map((sensor, idx) => (
                  <SensorCard key={idx} {...sensor} />
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <VideoDisplay />
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <Minimap />
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <NumberFormField />
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <NumberFormField />
        </GridItem>
      </Grid>
 * 
 * 
 * 
 * 
 * 
 */
