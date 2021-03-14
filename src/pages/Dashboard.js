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
import axios from "axios";
import { CommandResponseProvider } from "../components/CommandResponseProvider";

import { sendCommand } from "../fake_db/utils";

const ddd = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const postSome = async (url) => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    console.log(await JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const Dashboard = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  // const { sensorSettings } = useContext(SettingsContext);
  const [cameraAngle, setCameraAngle] = useState(90);

  const toggleRecording = async () => {
    var url = "http://localhost:8000/sensors/toggle_recording";
    await postSome(url);
  };

  const startRemoteConnection = () => {
    sendCommand("start_system", true);
  };

  const stopRemoteConnection = () => {
    sendCommand("start_system", false);
  };

  const sendResetCommand = () => {
    sendCommand("reset", true);
  };

  const sendCameraAngle = () => {
    sendCommand("camera_offset_angle", cameraAngle);
  };

  const lightsOn = () => {
    sendCommand("lights_on_off", true);
  };

  const lightsOff = () => {
    sendCommand("lights_on_off", false);
  };

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
            <HStack p={6} justifyContent="space-evenly">
              <VStack>
                <Button
                  id="connection-button"
                  color={textColor}
                  onClick={startRemoteConnection}
                  bg="green.400"
                  colorScheme="teal"
                  size="md"
                >
                  On
                </Button>
                <Button
                  id="connection-button"
                  color={textColor}
                  onClick={stopRemoteConnection}
                  bg="red.400"
                  colorScheme="teal"
                  size="md"
                >
                  Off
                </Button>

                <HStack></HStack>
              </VStack>
              <VStack>
                <Button
                  id="reset-button"
                  color={textColor}
                  onClick={sendResetCommand}
                  bg="yellow.200"
                  size="md"
                >
                  Reset
                </Button>
                <HStack></HStack>
              </VStack>
              <VStack>
                <Text color={textColor}>Logging</Text>
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
            <SensorDisplay />
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
            <HStack h="100%" p={12} justify="space-evenly">
              <Flex p={4}>
                <VStack>
                  <Text fontSize="2xl" color={textColor}>
                    AUTO MODE
                  </Text>
                  <Switch size="lg" />
                </VStack>
              </Flex>
              <Flex>
                <VStack>
                  <Text fontSize="2xl" color={textColor}>
                    DEPTH REGULATION
                  </Text>
                  <Switch size="lg" />
                </VStack>
              </Flex>
              <Flex>
                <VStack>
                  <Text fontSize="2xl" color={textColor}>
                    Lights
                  </Text>
                  <HStack>
                    <Button bg="green.500" onClick={lightsOn}>
                      On
                    </Button>
                    <Button bg="red.500" onClick={lightsOff}>
                      Off
                    </Button>
                  </HStack>
                  <Text fontSize="2xl" color={textColor}>
                    Camera angle
                  </Text>
                  {/* <Slider
                  id="camera-angle-slider"
                  aria-label="adjust-camera-angle"
                  onChangeEnd={sendCameraAngle}
                  onChange={(val) => setCameraAngle(val)}
                  defaultValue={90}
                  min={0}
                  max={180}
                  step={5}
                  w="100px"
                >
                  <SliderTrack bg="red.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider> */}
                  {/* <Text>{cameraAngle}</Text> */}
                </VStack>
              </Flex>
            </HStack>
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
                <Tooltip />
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
