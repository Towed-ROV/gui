import React from "react";
import { Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";

const Dashboard = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      h="80vh"
      mx="2vw"
      bg={boxColor}
      color={boxColor}
      alignContent="center"
      justifyContent="center"
    >
      <VideoDisplay />
      <SimpleGrid columns={1} p={3} spacing={10}>
        <NumberFormField />
        <SensorDisplay />
      </SimpleGrid>
    </Flex>
  );
};

export default Dashboard;
