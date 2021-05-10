import React, { useState } from "react";
import {
  Text,
  Heading,
  Flex,
  useColorModeValue,
  Grid,
  GridItem,
  VStack,
  InputGroup,
  InputLeftAddon,
  IconButton,
  Select,
  InputRightAddon,
  Button,
  useToast,
} from "@chakra-ui/react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Form, Formik } from "formik";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  deleteSession,
  getCompletedSessions,
  getWaypointsFromSession,
} from "../db/crud";
import WaypointCard from "../components/WaypointCard";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Map = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [sessionId, setSessionId] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [waypointSessions, setWaypointSessions] = useState([]);
  const toast = useToast();

  const fetchAndDisplayWaypoints = async (session_id) => {
    // Loads all waypoints from session_id and displays them
    if (session_id !== undefined) {
      const wps = await getWaypointsFromSession(session_id);
      setWaypoints(wps);
    }
  };

  const fetchWaypointSessions = async () => {
    // Loads completed session into the "Select"-options in Formik
    const sess = await getCompletedSessions();
    if (sess !== undefined) setWaypointSessions(sess);
  };

  const deleteSessionByID = async () => {
    // Deletes the select waypointSession-session_id in Formik
    if (sessionId !== undefined) {
      const r = await deleteSession(sessionId);
      if (r !== undefined) {
        toast({
          title: `Deleted session: ${sessionId}.`,
          position: "top-right",
          description: `Detail: ${r.message}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex h="100vh">
      <Grid templateColumns="repeat(3, 1fr)" w="100%" h="100%">
        <GridItem w="100%" colStart={1} colEnd={3}>
          <MapContainer
            zoomControl={false}
            className="map"
            center={[62.331776, 6.541386]}
            zoom={10}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <ZoomControl position="topright" />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {waypoints &&
              waypoints.map((wp) => (
                <Marker key={wp.id} position={[wp.latitude, wp.longitude]}>
                  <Popup>
                    <WaypointCard
                      id={wp.id}
                      imgName={wp.img_name}
                      sensors={wp.sensors}
                    />
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </GridItem>
        <GridItem bg={boxColor} colStart={3} colEnd={3}>
          <VStack p={6} h="100%" align="stretch">
            <Heading>Mapping</Heading>
            <Flex>
              <Text>Select a session, and start analyzing!</Text>
            </Flex>
            <Formik
              validateOnChange={false}
              initialValues={{ session_name: "" }}
              onSubmit={(data, actions) => {
                actions.setSubmitting(true);
                const name = data.session_name;
                fetchAndDisplayWaypoints(name);
                setSessionId(name);
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
                        onClick={fetchWaypointSessions} //
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
                      // disabled={isSessionRunning}
                    >
                      <option hidden value="">
                        -- select --
                      </option>
                      {waypointSessions &&
                        waypointSessions.map((session) => {
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
                        // isDisabled={isSessionRunning}
                        color="black"
                      >
                        Display
                      </Button>

                      <Button
                        size="sm"
                        bg="yellow.400"
                        color="black"
                        onClick={() => {
                          props.setFieldValue("session_name", "", false);
                          setWaypoints([]);
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        size="sm"
                        bg="red.400"
                        color="black"
                        onClick={() => {
                          deleteSessionByID();
                          setWaypoints([]);
                          setSessionId(undefined);
                          props.setFieldValue("session_name", "", false);
                        }}
                      >
                        Delete
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </Form>
              )}
            </Formik>
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Map;
