import React, { useContext } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";
import Minimap from "../components/Minimap";
import { SettingsContext } from "../components/SettingsProvider";
import { SensorCard } from "../components/SensorCard";

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const { sensorSettings } = useContext(SettingsContext);

  return (
    <Flex
      h="80vh"
      mx="2vw"
      color={boxColor}
      alignContent="center"
      justifyContent="center"
    >
      <Grid
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
    </Flex>
  );
};

export default Dashboard;
