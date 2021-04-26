import React, { useContext, useEffect, useState } from "react";
import {
  Box,
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
  Icon,
  useToast,
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
import { VscDebugStart } from "react-icons/vsc";
import { IoStop } from "react-icons/io5";
import { FcAddDatabase } from "react-icons/fc";
import { CommandResponseContext } from "./CommandResponseProvider";

const Session = () => {
  const { sensorData } = useContext(CommandResponseContext);
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const toast = useToast();
  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [currentLatLng, setCurrentLatLng] = useState([undefined, undefined]);
  const [currentSessions, setCurrentSessions] = useState([]);
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

  const finishSession = async () => {
    setIsSessionRunning(false);
    setWaypoints([]);
    setTimer(0);

    const isComplete = true;
    const details = await updateSession(sessionId, isComplete);

    toast({
      title: `Saved session: ${details.session_id}.`,
      position: "bottom-left",
      description: `ID: ${details.id}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const filterWaypointLatLng = (sensorData) => {
    let validChange = false;
    let updateLatLng = false;
    const latLng = createLatLng(sensorData);

    if (!latLng.includes(undefined)) {
      if (currentLatLng.includes(undefined)) {
        updateLatLng = true;
      } else {
        if (isLatLongDistanceValid(currentLatLng, latLng)) {
          validChange = true;
          updateLatLng = true;
        }
      }
    }
    return [validChange, updateLatLng, latLng];
  };

  useEffect(() => {
    saveDataAndDisplay(sensorData);
  }, [sensorData]);

  useEffect(() => {
    if (isSessionRunning) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
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
    <Box
      bg={boxColor}
      color={textColor}
      boxShadow="dark-lg"
      p={4}
      h="100%"
      w="100%"
    >
      <HStack bg={boxColor} color={textColor}>
        <Text color={textColor} fontSize="2xl">
          Session
        </Text>
        <Spacer />
        <Text color={textColor}>
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
          if (err === "DUPLICATE") {
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
                  <FormLabel color={textColor} htmlFor="name" p={0}>
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
                      <Box
                        minW="10rem"
                        as="button"
                        bg="teal"
                        color="white"
                        type="submit"
                        h={8}
                      >
                        <Icon as={FcAddDatabase} mr={2} />
                        CREATE
                      </Box>
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
          console.log("Running: ", data.session_name);
          setIsSessionRunning(true);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <InputGroup p={2}>
              <InputLeftAddon bg={boxColor}>
                <IconButton
                  bg="teal"
                  color="white"
                  aria-label="Search database"
                  icon={<RepeatIcon />}
                  size="sm"
                  onClick={fetchSessions} // fetchSessions
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
              {}
              <InputRightAddon bg={boxColor}>
                <Box
                  as="button"
                  type="submit"
                  id="start-button"
                  minW="10rem"
                  bg="teal"
                  color="white"
                  disabled={isSessionRunning}
                  h={8}
                  onClick={() => {
                    console.log("START BUTTON");
                  }}
                >
                  <Icon as={VscDebugStart} mr={2} />
                  START
                </Box>
                <Box
                  ml={4}
                  as="button"
                  type="button"
                  id="stop-button"
                  disabled={!isSessionRunning}
                  minW="10rem"
                  bg="teal"
                  color="white"
                  h={8}
                  onClick={() => {
                    finishSession();
                    props.setFieldValue("session_name", "", false);
                  }}
                >
                  <Icon as={IoStop} mr={2} />
                  STOP
                </Box>
              </InputRightAddon>
            </InputGroup>
          </Form>
        )}
      </Formik>
      <Flex
        h="50%"
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
                <Td
                  style={{ textAlign: "center" }}
                  colSpan="4"
                  className="text-center"
                >
                  <div className="p-2">No data</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
};

export default Session;
