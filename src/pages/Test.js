import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormLabel,
  FormControl,
  Input,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { saveWaypoint } from "../fake_db/utils";
import { distanceBetweenLatLong } from "../helpers/utils";
import { validateStringInput } from "../helpers/validate";

const gpsMIN = [62.383713, 6.977545];
const gpsMAX = [62.38389, 6.97916];

const rangeLat = gpsMAX[0] - gpsMIN[0];
const rangeLng = gpsMAX[1] - gpsMIN[1];

const STEPS = 4;

const stepLat = rangeLat / STEPS;
const stepLng = rangeLng / STEPS;

const db = [
  {
    id: -1,
    img_name: "test.jpg",
    latitude: -1,
    longitude: -1,
  },
  {
    id: -2,
    img_name: "test.jpg",
    latitude: -1,
    longitude: -1,
  },
  {
    id: -3,
    img_name: "test.jpg",
    latitude: -1,
    longitude: -1,
  },
  {
    id: -4,
    img_name: "test.jpg",
    latitude: -1,
    longitude: -1,
  },
  {
    id: -5,
    img_name: "test.jpg",
    latitude: -1,
    longitude: -1,
  },
];

let fakeSensors = [
  {
    name: "temperature",
    value: 0,
  },
  {
    name: "oxygen",
    value: 0,
  },
  {
    name: "latitude",
    value: 62.383713,
  },
  {
    name: "depth",
    value: 0,
  },
  {
    name: "longitude",
    value: 6.977545,
  },
];

/**
 * TODO
 * 1. Create sessionId
 * 2. Start session.
 *
 * display is running
 * stop option
 * onExit cleanup
 *
 */
const Test = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [currentLatLng, setCurrentLatLng] = useState([undefined, undefined]);

  const [id, setId] = useState(0);

  const displayWaypoint = (wp) => {
    if (wp === undefined) return;

    const wps = [...waypoints];
    if (wps.length > 4) {
      wps.shift();
    }
    wps.push(wp);
    setWaypoints(wps);
  };

  const saveDataAndDisplay = async (sensorData) => {
    if (isSessionRunning) {
      const [isValid, latLng] = filterWaypointLatLng(sensorData);
      if (isValid) {
        const waypointDetails = await saveWaypoint(
          sessionId,
          latLng,
          sensorData
        );
        const waypoint = extractWaypoint(waypointDetails);
        displayWaypoint(waypoint);
      } else {
        console.log("Distance not valid");
      }
    }
  };

  const extractWaypoint = (wp) => {
    if (wp === undefined) return;
    return {
      session_id: wp.session_id,
      latitude: wp.latitude,
      longitude: wp.longitude,
    };
  };

  const cancelSession = () => {
    setSessionId("");
  };

  const filterWaypointLatLng = (sensorData) => {
    var validChange = false;
    var newLatLng = [undefined, undefined];
    sensorData.forEach((sensor) => {
      if (sensor.name === "latitude") {
        newLatLng[0] = sensor.value;
      }
      if (sensor.name === "longitude") {
        newLatLng[1] = sensor.value;
      }
    });

    console.log("Calculating ... ");
    console.log("CURR: ", currentLatLng);
    console.log("NEWW: ", newLatLng);
    if (!newLatLng.includes(undefined)) {
      if (currentLatLng[0] === undefined || currentLatLng[1] === undefined) {
        setCurrentLatLng(newLatLng);
      } else {
        var distance = distanceBetweenLatLong(currentLatLng, newLatLng);
        console.log("Distance: ", distance);
        const TWO_METRES = 2;
        if (distance > TWO_METRES) {
          setCurrentLatLng(newLatLng);
          validChange = true;
        }
      }
    }
    return [validChange, newLatLng];
  };

  // TODO: Add start session to DB
  // TODO: TEST MORE

  useEffect(() => {
    fakeSensors.forEach((sensor) => {
      if (sensor.name === "latitude") {
        sensor.value += stepLat;
      } else if (sensor.name === "longitude") {
        sensor.value += stepLng;
      } else {
        sensor.value = id;
      }
    });
    saveDataAndDisplay(fakeSensors);
  }, [id]);

  return (
    <Flex
      h="92vh"
      mx="1vw"
      my="1vh"
      boxShadow="dark-lg"
      rounded="lg"
      color={textColor}
      bg={boxColor}
      p={10}
      bg="blue.100"
    >
      <Box>
        <Text fontSize="2xl">Session</Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            console.log(typeof data.name);
            setSessionId(data.name);
            actions.setFieldValue("value", "", false);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field
                placeholder="name"
                name="name"
                type="input"
                validate={validateStringInput}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel color={textColor} htmlFor="name">
                      Create a name for your session
                    </FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder=""
                      autoComplete="off"
                      color={textColor}
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                bg="teal"
                isLoading={props.isSubmitting}
                type="submit"
                color={textColor}
                disabled={isSessionRunning}
              >
                Create
              </Button>
              <Button
                onClick={() => setId(id + 1)}
                color={textColor}
                mt={4}
                bg="teal"
              >
                Add
              </Button>
              <Text>Value: {id}</Text>
              <Text>LatLng: {currentLatLng.toString()}</Text>
            </Form>
          )}
        </Formik>
        <HStack justifyContent="space-between" p={4}>
          {sessionId ? (
            <Text color={textColor}>Loaded: {sessionId}</Text>
          ) : (
            <Text color={textColor}>No session created ..</Text>
          )}
          {sessionId ? (
            <Text color={textColor}>
              Running: {isSessionRunning.toString()}
            </Text>
          ) : (
            <Text></Text>
          )}
          <HStack justifyContent="center" alignContent="center">
            <Button
              bg="green.400"
              color={textColor}
              onClick={() => setIsSessionRunning(true)}
              isDisabled={isSessionRunning}
            >
              Start
            </Button>
            <Button
              bg="yellow.400"
              color={textColor}
              onClick={() => cancelSession()}
              isDisabled={!isSessionRunning}
            >
              Cancel
            </Button>
            <Button
              bg="red.400"
              color={textColor}
              onClick={() => setIsSessionRunning(false)}
              isDisabled={!isSessionRunning}
            >
              Stop
            </Button>
          </HStack>
        </HStack>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th style={{ width: "50px", textAlign: "left" }}>Id</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Img name</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Latitude</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Longitude</Th>
            </Tr>
          </Thead>
          <Tbody>
            {waypoints &&
              waypoints.map((sensor) => (
                <Tr key={sensor.id}>
                  <Td style={{ width: "50px" }}>{sensor.id}</Td>
                  <Td style={{ width: "200px" }}>{sensor.img_name}</Td>
                  <Td style={{ width: "200px" }}>{sensor.latitude}</Td>
                  <Td style={{ width: "200px" }}>{sensor.longitude}</Td>
                </Tr>
              ))}
            {!waypoints && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </Tr>
            )}
            {waypoints && !waypoints.length && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No waypoints to display</div>
                </td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Test;
