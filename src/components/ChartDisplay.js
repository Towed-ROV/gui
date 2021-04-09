import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChartContext } from "./ChartProvider";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Minimap from "./Minimap";
import Chart from "./Chart";
import SensorDisplay from "./SensorDisplay";

const ChartDisplay = ({ sensorData, chartMode }) => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const tabTextColor = useColorModeValue("gray.200", "blackAlpha.900");
  const boxColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Flex my={4} bg="blue">
      <Tabs
        colorScheme="teal"
        w="100%"
        isFitted
        variant="enclosed"
        onChange={(index) => console.log(index)}
      >
        <TabList ml={32}>
          <Tab
            color={textColor}
            _selected={{ color: tabTextColor, bg: "teal" }}
          >
            Stream
          </Tab>
          <Tab
            color={textColor}
            _selected={{ color: tabTextColor, bg: "teal" }}
          >
            Chart
          </Tab>
          <Tab
            color={textColor}
            _selected={{ color: tabTextColor, bg: "teal" }}
          >
            Map
          </Tab>
        </TabList>
        <TabPanels h="100%" w="100%">
          <TabPanel color={textColor} w="100%" h="90%">
            <SensorDisplay sensorData={sensorData} />
          </TabPanel>
          <TabPanel color={textColor} w="100%" h="90%">
            <Chart sensorData={sensorData} chartMode={chartMode} />
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
