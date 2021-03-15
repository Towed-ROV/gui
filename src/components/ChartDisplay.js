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
} from "recharts";
import Minimap from "./Minimap";
import { ChartDataContext } from "./ChartDataProvider";

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

const DATA = [];
//   {
//     name: 0,
//     value: 1,
//   },
//   {
//     name: 1,
//     value: 5,
//   },
//   {
//     name: 2,
//     value: 2,
//   },
//   {
//     name: 3,
//     value: 7,
//   },
//   {
//     name: 4,
//     value: 10,
//   },
// ];

const singleData = (clock) => {
  //   let val = Math.floor(Math.random() * 10);
  //   let val = Math.floor(Math.random() * 10);
  return { name: clock, value: clock };
};

const ChartDisplay = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const { chartData } = useContext(ChartDataContext);

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
            {/* <LineChart width={850} height={300} data={ddd}>
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
            </LineChart> */}
            <AreaChart
              width={900}
              height={300}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                stroke={textColor === "blackAlpha.900" ? "black" : "white"}
                dataKey="tick"
              />
              <YAxis
                stroke={textColor === "blackAlpha.900" ? "black" : "white"}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                name="Temperature"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
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
