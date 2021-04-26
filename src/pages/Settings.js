import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  ModalOverlay,
  Tr,
  useColorModeValue,
  VStack,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useSpring } from "framer-motion";

import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../components/SettingsProvider";
import { createSession, createWaypoint, updateSession } from "../db/crud";
import { fakeSensors } from "../db/dummy";
import api from "../services/api";

const initialFormData = undefined;

const Settings = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isEditing, setIsEditing] = useState(false);

  const {
    sensorSettings,
    addSensorToSettings,
    removeSensorFromSettings,
    setNewSettings,
  } = useContext(SettingsContext);

  // const addDummyData = () => {
  //   dummyData.map((data) => {
  //     addSensorToSettings(data);
  //   });
  //   console.log("Loaded dummydata.");
  // };

  const updateSensorEnabledState = (id, state) => {
    let updatedSettings = [];
    sensorSettings.forEach((user) => {
      if (user.id === id) {
        user["enabled"] = state;
      }
      updatedSettings.push(user);
    });
    setNewSettings(updatedSettings);
  };

  useEffect(() => {
    // addDummyData();
  }, []);

  const deleteSensor = (id) => {
    setNewSettings(
      sensorSettings.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    // 1. delete from db.
    // 2. remove local copy
    setNewSettings((sensors) => sensors.filter((x) => x.id !== id));
  };

  const seedDatabase = async () => {
    // A pure test method for seeding the database with 'x' samples.
    const totalSamples = 10;

    let data = [...fakeSensors];
    let samples = [];

    let step = 0;

    const sessID = "Session-123";
    const response = await createSession(sessID);
    console.log("Created: ", sessID);

    const LAT = fakeSensors.filter((sensor) => sensor.name === "latitude")[0]
      .value;
    const LNG = fakeSensors.filter((sensor) => sensor.name === "longitude")[0]
      .value;

    for (let i = 0; i < totalSamples; i++) {
      samples.push(LNG + step);
      step += 0.001;
    }

    for await (let samp of samples) {
      await createWaypoint(sessID, [LAT, samp], data);
    }

    const isComplete = true;
    const responseDetails = await updateSession(sessID, isComplete);
    console.log("Session: ", sessID, " completed: ", isComplete);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isSensorInSettings = (name) => {
    let exist = false;
    if (sensorSettings.some((sensor) => sensor.name === name)) {
      exist = true;
    }
    return exist;
  };

  const validateSensorExistence = (name) => {
    let error;
    if (!name) {
      error = "Name is required.";
    } else if (isSensorInSettings(name)) {
      error = name + " exist.";
    }
    console.log(error);
    return error;
  };

  return (
    <Flex h="100vh" bg={boxColor} color={textColor} p={10}>
      <Box>
        <Heading pb={8}>Sensors</Heading>
        <Button isDisabled={!isEditing} onClick={onOpen} colorScheme="green">
          Add User
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent onSubmit={() => console.log()}>
            <ModalHeader>Add sensor</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={8}>
              <Formik
                initialValues={{
                  enabled: false,
                  name: "",
                  origin: "",
                  role: "",
                  port: "",
                }}
                onSubmit={async (values, actions) => {
                  addSensorToSettings(values);
                  actions.resetForm();
                  onClose();
                }}
              >
                <Form>
                  <VStack>
                    <Field
                      placeholder="name"
                      name="name"
                      type="input"
                      validate={validateSensorExistence}
                    >
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder="name"
                            autoComplete="off"
                          />
                          <div>{form.errors.name}</div>
                        </FormControl>
                      )}
                    </Field>

                    <Field placeholder="origin" name="origin" type="input">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.touched.name}>
                          <FormLabel htmlFor="origin">Origin</FormLabel>
                          <Input
                            {...field}
                            id="origin"
                            placeholder="origin"
                            autoComplete="off"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field placeholder="port" name="port" type="input">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.touched.name}>
                          <FormLabel htmlFor="value">Port</FormLabel>
                          <Input
                            {...field}
                            id="port"
                            placeholder="port"
                            autoComplete="off"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <HStack p={6}>
                      <FormLabel htmlFor="pub">
                        <Field
                          type="radio"
                          id="pub"
                          name="role"
                          value="PUB"
                        ></Field>{" "}
                        Publisher
                      </FormLabel>
                      <FormLabel htmlFor="pub">
                        <Field
                          type="radio"
                          id="sub"
                          name="role"
                          value="SUB"
                        ></Field>{" "}
                        Subscriber
                      </FormLabel>
                      <FormLabel htmlFor="pub">
                        <Field
                          type="radio"
                          id="pubsub"
                          name="role"
                          value="PUBSUB"
                        ></Field>{" "}
                        Both
                      </FormLabel>
                    </HStack>

                    <Button colorScheme="teal" type="submit">
                      Submit
                    </Button>
                  </VStack>
                </Form>
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th style={{ width: "50px", textAlign: "left" }}>Enabled</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Name</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Origin</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Role</Th>
              <Th style={{ width: "200px", textAlign: "left" }}>Port</Th>
              <Th style={{ width: "200px", textAlign: "left" }}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sensorSettings &&
              sensorSettings.map((sensor) => (
                <Tr key={sensor.id}>
                  <Td style={{ width: "50px" }}>
                    <Checkbox
                      isDisabled={!isEditing}
                      isChecked={sensor.enabled}
                      onChange={(e) =>
                        updateSensorEnabledState(sensor.id, e.target.checked)
                      }
                    />
                  </Td>
                  <Td style={{ width: "200px" }}>{sensor.name}</Td>
                  <Td style={{ width: "200px" }}>{sensor.origin}</Td>
                  <Td style={{ width: "200px" }}>{sensor.role}</Td>
                  <Td style={{ width: "200px" }}>{sensor.port}</Td>
                  <Td style={{ whiteSpace: "nowrap" }}>
                    {/* <Button colorScheme="blue">Edit</Button>  @TODO */}
                    <Button
                      onClick={() => deleteSensor(sensor.id)}
                      isDisabled={!isEditing}
                      // disabled={sensor.isDeleting}
                      colorScheme="red"
                    >
                      {sensor.isDeleting ? <span></span> : <span>Delete</span>}
                    </Button>
                  </Td>
                </Tr>
              ))}
            {!sensorSettings && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </Tr>
            )}
            {sensorSettings && !sensorSettings.length && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No sensors To Display</div>
                </td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {isEditing ? (
          <Flex p={4}>
            <Button
              colorScheme="purple"
              onClick={() => {
                console.log("Saved: ", JSON.stringify(sensorSettings, null, 2));
                setIsEditing(false);
              }}
            >
              Save
            </Button>
          </Flex>
        ) : (
          <Flex p={4}>
            <Button colorScheme="messenger" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Flex>
        )}
        <Divider />
        <HStack>
          <Heading>Database</Heading>
          <span>Remember to use test_img and not img from queue</span>
          <Button onClick={() => seedDatabase()}>SEED</Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Settings;
