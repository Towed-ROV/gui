import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  useColorModeValue,
  Switch,
  VStack,
} from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";
import Minimap from "../components/Minimap";
import { SettingsContext } from "../components/SettingsProvider";
import { SensorCard } from "../components/SensorCard";
import axios from "axios";
const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  // const { sensorSettings } = useContext(SettingsContext);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setisConnected] = useState(false);

  const postSome = async (url) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      console.log(await JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleRecording = async () => {
    var url = "http://localhost:8000/sensors/toggle_recording";
    await postSome(url);
  };

  return (
    <Flex
      h="82vh"
      mx="2vw"
      color={boxColor}
      alignContent="center"
      justifyContent="center"
    >
      <Grid
        templateRows="repeat(10, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        w="100%"
        h="100%"
      >
        <GridItem
          bg={boxColor}
          boxShadow="dark-lg"
          rounded="lg"
          colSpan={3}
          rowSpan={2}
        >
          <HStack p={6} justifyContent="space-evenly">
            <VStack>
              <Heading color={textColor}>Connection</Heading>
              <Spacer />
              <HStack>
                <Button color={textColor} size="lg" bg="teal">
                  START
                </Button>
                <Button color={textColor} size="lg" bg="teal">
                  STOP
                </Button>
              </HStack>
            </VStack>
            <VStack>
              <Heading color={textColor}>Recording</Heading>
              <Spacer />
              <Switch
                name="Status"
                onChange={toggleRecording}
                size="lg"
                colorScheme="green"
              >
                Connect
              </Switch>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem
          bg={boxColor}
          boxShadow="dark-lg"
          rounded="lg"
          colSpan={3}
          rowSpan={3}
        >
          <NumberFormField />
        </GridItem>
        <GridItem
          bg={boxColor}
          boxShadow="dark-lg"
          rounded="lg"
          colSpan={3}
          rowSpan={8}
        >
          <Flex justify="center" align="center">
            <VideoDisplay />
          </Flex>
        </GridItem>
        <GridItem
          bg={boxColor}
          rowSpan={7}
          colSpan={1}
          color={textColor}
          boxShadow="dark-lg"
          rounded="lg"
        >
          <VStack p={12} spacing="30px" align="stretch">
            <Box>
              <Heading>AUTO MODE</Heading>
              <Switch size="lg" />
            </Box>
            <Box>
              <Heading>DEPTH REGULATIOBN</Heading>
              <Switch size="lg" />
            </Box>
            <Box>
              <Heading>Lights</Heading>
              <Switch size="lg" />
            </Box>

            <Divider />
          </VStack>
        </GridItem>
        <GridItem
          bg={boxColor}
          rowSpan={7}
          colSpan={2}
          color={textColor}
          boxShadow="dark-lg"
          rounded="lg"
        >
          {/* <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
                  {sensorSettings.map((sensor, idx) => (
                    <SensorCard key={idx} {...sensor} />
                  ))}
                </SimpleGrid>
              </Box> */}
          <SensorDisplay />
        </GridItem>
      </Grid>
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
