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


const singleData = (clock) => {
  //   let val = Math.floor(Math.random() * 10);
  //   let val = Math.floor(Math.random() * 10);
  return { name: clock, value: clock };
};

const ChartDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const { referenceLines, chartData } = useContext(ChartContext);

  //   const handleAdd = (obj, t) => {
  //     if (chartData.length > 100) {
  //       handleRemove();
  //     }
  //     obj.tick = t;
  //     setTestData((items) => [...items, obj]);
  //   };

  //   const handleRemove = () => {
  //     let items = [...testData];
  //     let _ = items.shift();
  //     setTestData(items);
  //   };

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       handleINC();
  //       let obj = { value: tick };
  //       handleAdd(obj, tick);
  //     }, 1000);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, [sensorData]);

  return (
    <Flex w="100%" h="100%">
      <Tabs variant="solid-rounded" colorScheme="green" w="100%">
        <TabList>
          <Tab color={textColor}>Charts</Tab>
          <Tab color={textColor}>Maps</Tab>
        </TabList>
        <TabPanels h="100%" w="100%">
          <TabPanel color={textColor} w="100%" h="90%">
            <LineChart width={850} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                stroke={textColor === "blackAlpha.900" ? "black" : "white"}
                dataKey="value"
              />
              <YAxis
                mirror={true}
                stroke={textColor === "blackAlpha.900" ? "black" : "white"}
              />
              <Legend />
              <ReferenceLine y={referenceLines.set_point_depth} label="Set point" stroke="red" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
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
