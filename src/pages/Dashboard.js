import React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";

const Dashboard = () => {
  return (
    <Flex
      bg="rov.light"
      color="rov.dark"
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
