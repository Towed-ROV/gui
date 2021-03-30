import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChartContext } from "./ChartProvider";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Minimap from "./Minimap";
import Chart from "./Chart";

const ChartDisplay = ({ sensorData, chartMode }) => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  return (
    <Flex my={4}>
      <Tabs variant="solid-rounded" colorScheme="teal" w="100%">
        <TabList ml={32}>
          <Tab color={textColor}>Chart</Tab>
          <Tab color={textColor}>Map</Tab>
        </TabList>
        <TabPanels h="100%" w="100%">
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
