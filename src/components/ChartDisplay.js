import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  AreaChart,
  YAxis,
  Tooltip,
  Area,
  ReferenceLine,
} from "recharts";
import Minimap from "./Minimap";
import { ChartContext } from "./ChartProvider";
import Chart from "./Chart";


const singleData = (clock) => {
  return { name: clock, value: clock };
};

const ChartDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");

   return (
    <Flex w="100%" h="100%">
      <Tabs variant="solid-rounded" colorScheme="green" w="100%">
        <TabList>
          <Tab color={textColor}>Charts</Tab>
          <Tab color={textColor}>Maps</Tab>
        </TabList>
        <TabPanels h="100%" w="100%">
          <TabPanel color={textColor} w="100%" h="90%">
            <Chart/>
          </TabPanel>
          <TabPanel w="100%" h="90%">
            <Flex color={textColor}>
              <Minimap />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ChartDisplay;
