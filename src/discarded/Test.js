import React, { useEffect, useState } from "react";
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
  Spacer,
  InputGroup,
  InputRightAddon,
  Select,
  InputLeftAddon,
  IconButton,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import {
  createSession,
  getSessions,
  createWaypoint,
  updateSession,
} from "../db/crud";
import {
  createLatLng,
  extractWaypointIntoDict,
  isLatLongDistanceValid,
} from "../helpers/utils";
import { validateStringInput } from "../helpers/validate";
import { RepeatIcon } from "@chakra-ui/icons";

const gpsMIN = [62.383713, 6.977545];
const gpsMAX = [62.38389, 6.97916];

const rangeLat = gpsMAX[0] - gpsMIN[0];
const rangeLng = gpsMAX[1] - gpsMIN[1];

const STEPS = 4;

const stepLat = rangeLat / STEPS;
const stepLng = rangeLng / STEPS;

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

const Test = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [currentLatLng, setCurrentLatLng] = useState([undefined, undefined]);
  const [currentSessions, setCurrentSessions] = useState([]);
  const [id, setId] = useState(0);
  const [timer, setTimer] = useState(0);

  const displayWaypoint = (wp) => {
    if (wp === undefined) return;
    const wps = [...waypoints];
    // MAX 10 WAYPOINTS
    if (wps.length > 9) wps.pop();
    wps.unshift(wp);
    setWaypoints(wps);
  };

  const fetchSessions = async () => {
    const sess = await getSessions();
    setCurrentSessions(sess);
    console.log(sess);
    // if (sess !== undefined) {
    //   setCurrentSessions(sess);
    // }
  };

  const saveDataAndDisplay = async (sensorData) => {
    if (isSessionRunning) {
      const [isValid, updateLatLng, newLatLng] = filterWaypointLatLng(
        sensorData
      );

      if (updateLatLng) setCurrentLatLng(newLatLng); // basically previous = current

      if (isValid) {
        const waypointDetails = await createWaypoint(
          sessionId,
          newLatLng,
          sensorData
        );

        const waypoint = extractWaypointIntoDict(waypointDetails);

        displayWaypoint(waypoint);
      }
    }
  };

  const pauseSession = () => {};

  const filterWaypointLatLng = (sensorData) => {
    let validChange = false;
    let updateLatLng = false;
    const latLng = createLatLng(sensorData);

    if (!latLng.includes(undefined)) {
      if (currentLatLng.includes(undefined)) {
        // setCurrentLatLng(latLng);
        updateLatLng = true;
      } else {
        if (isLatLongDistanceValid(currentLatLng, latLng)) {
          validChange = true;
          updateLatLng = true;
          // setCurrentLatLng(latLng);
        }
      }
    }
    return [validChange, updateLatLng, latLng];
  };

  // Simulate SENSORDATA
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

  // Simulate STATE CHANGES
  useEffect(() => {
    if (isSessionRunning) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
        setId((id) => id + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isSessionRunning]);

  const displaySeconds = (timer % 60).toString().padStart(2, "0");
  const displayMinutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");

  return (
    <Flex h="100vh" color={textColor} p={10} bg={boxColor}>
      <Box>
        <HStack>
          <Text fontSize="2xl">Session</Text>
          <Spacer />
          <Text>
            ET | {displayMinutes}:{displaySeconds}
          </Text>
        </HStack>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{ name: "" }}
          onSubmit={async (data, actions) => {
            actions.setSubmitting(true);
            const err = await createSession(data.name);
            if (err) {
              actions.setErrors({ name: "Session already exists" });
            } else {
              actions.setFieldValue("name", "", false);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field
                placeholder="name"
                name="name"
                type="input"
                validateOnChange={false}
                validateOnBlur={false}
                validate={validateStringInput}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name} // form.touched.name
                  >
                    <FormLabel color={textColor} htmlFor="name">
                      Create a name for your session
                    </FormLabel>
                    <InputGroup size="sm" p={2}>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Create a name for your session"
                        autoComplete="off"
                        color={textColor}
                        size="sm"
                        disabled={isSessionRunning}
                      />

                      <InputRightAddon bg={boxColor} size="sm">
                        <Button
                          colorScheme="blue"
                          isLoading={props.isSubmitting}
                          type="submit"
                          color={textColor}
                          disabled={isSessionRunning}
                          size="sm"
                        >
                          Create
                        </Button>
                      </InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Formik
          validateOnChange={false}
          initialValues={{ session_name: "" }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            setSessionId(data.session_name);
            console.log("Run: ", data.session_name);
            setIsSessionRunning(true);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <InputGroup p={2}>
                <InputLeftAddon bg={boxColor}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<RepeatIcon />}
                    size="sm"
                    onClick={fetchSessions} //
                  />
                </InputLeftAddon>
                <Select
                  name="session_name"
                  onChange={props.handleChange}
                  variant="outline"
                  onBlur={props.handleBlur}
                  style={{ display: "block" }}
                  value={props.values.session_name}
                  color={textColor}
                  id="session_name"
                  disabled={isSessionRunning}
                >
                  <option hidden value="">
                    -- select --
                  </option>
                  {currentSessions &&
                    currentSessions.map((session) => {
                      return (
                        <option key={session.id} value={session.session_id}>
                          {session.session_id}
                        </option>
                      );
                    })}
                </Select>

                <InputRightAddon bg={boxColor}>
                  <Button
                    bg="green.400"
                    size="sm"
                    isLoading={props.isSubmitting}
                    type="submit"
                    isDisabled={isSessionRunning}
                    color={textColor}
                  >
                    Start
                  </Button>
                  <Button
                    size="sm"
                    bg="yellow.400"
                    color={textColor}
                    onClick={() => pauseSession()}
                    isDisabled={!isSessionRunning}
                  >
                    Pause
                  </Button>
                  <Button
                    size="sm"
                    bg="red.400"
                    color={textColor}
                    onClick={() => {
                      setIsSessionRunning(false);
                      props.setFieldValue("session_name", "", false);
                      updateSession(sessionId, true);
                      setWaypoints([]);
                      setTimer(0);
                    }}
                    isDisabled={!isSessionRunning}
                  >
                    Stop
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </Form>
          )}
        </Formik>
        <Flex
          h="200px"
          overflowY="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "10px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
            },
          }}
        >
          <Table variant="striped" colorScheme="blackAlpha" size="sm">
            <Thead>
              <Tr>
                <Th isNumeric style={{ width: "50px", textAlign: "left" }}>
                  Id
                </Th>
                <Th style={{ width: "200px", textAlign: "left" }}>Img name</Th>
                <Th isNumeric style={{ width: "200px", textAlign: "left" }}>
                  Latitude
                </Th>
                <Th isNumeric style={{ width: "200px", textAlign: "left" }}>
                  Longitude
                </Th>
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default Test;

{
  /* <HStack justifyContent="space-between" p={4}>
          


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

}
//   </HStack>
// </HStack> */
}
