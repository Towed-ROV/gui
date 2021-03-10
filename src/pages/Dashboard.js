import React, { useContext, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
} from "@chakra-ui/react";
import VideoDisplay from "../components/VideoDisplay";
import SensorDisplay from "../components/SensorDisplay";
import NumberFormField from "../components/NumberFormField";
import Minimap from "../components/Minimap";
import { SettingsContext } from "../components/SettingsProvider";
import { SensorCard } from "../components/SensorCard";
import axios from "axios";

const ddd = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
      h="92vh"
      mx="1vw"
      my="1vh"
      color={boxColor}
      alignContent="center"
      justifyContent="center"
    >
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
        rowSpan={5}>
        <HStack p={6} justifyContent="space-evenly">
            <VStack>
              <Text color={textColor}>Connection</Text>
              <Spacer />
              <HStack>
                <Button color={textColor} size="md" bg="teal">
                  START
                </Button>
                <Button color={textColor} size="md" bg="teal">
                  STOP
                </Button>
              </HStack>
            </VStack>
            <VStack>
              <Text color={textColor}>Recording</Text>
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
        rowSpan={5}>
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
        rowSpan={5}>
          <VStack w="100%" h="60%">
              <Text color={textColor}>Messages</Text>
              <Flex w="100%" h="100%" border="2px" borderColor="gray.400" color={textColor}>MESSAGE BOX</Flex>
          </VStack>
          <NumberFormField />
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={7}
        rowSpan={3}>
        <VStack p={12} spacing="30px" align="stretch">
            <Box>
              <Switch size="lg" />
              <Text color={textColor}>AUTO MODE</Text>
            </Box>
            <Box>
              <Switch size="lg" />
              <Text color={textColor}>DEPTH REGULATION</Text>
            </Box>
            <Box>
              <Switch size="lg" />
              <Text color={textColor}>Lights</Text>
            </Box>
            <Divider />
          </VStack>
      </GridItem>
      <GridItem
        bg={boxColor}
        boxShadow="dark-lg"
        rounded="lg"
        p={2}
        colSpan={7}
        rowSpan={3}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={200}
              height={100}
              data={ddd}
              margin={{
                top: 5,
                right: 15,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
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
