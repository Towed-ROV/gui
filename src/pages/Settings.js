import {
  Box,
  Button,
  Checkbox,
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
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../components/SettingsProvider";
import {
  createSetting,
  deleteSetting,
  getSettings,
  updateSetting,
} from "../db/crud";

const Settings = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    sensorSettings,
    addSensorToSettings,
    removeSensorFromSettings,
    updateSensorEnabled,
    setNewSettings,
  } = useContext(SettingsContext);

  const addSetting = async (sensor) => {
    let dbSensor = await createSetting(sensor);
    console.log("From DB ADD: ", dbSensor);
    addSensorToSettings(dbSensor);
  };

  const setEnabledSetting = async (id, enabled) => {
    const dbSensor = await updateSetting(id, enabled); // DATABASE
    if (dbSensor !== undefined) {
      updateSensorEnabled(dbSensor); // LOCAL
    }
  };

  const deleteSensorFromSetting = async (id) => {
    const dbSensor = await deleteSetting(id); // DATABASE
    if (dbSensor !== undefined) {
      removeSensorFromSettings(dbSensor.id); // LOCAL
    }
  };

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
    return error;
  };

  useEffect(() => {
    async function fetchDatabaseSettings() {
      let dbSettings = await getSettings();
      setNewSettings(dbSettings);
    }
    fetchDatabaseSettings();
  }, []);

  return (
    <Flex h="100vh" bg={boxColor} color={textColor} p={20}>
      <Box>
        <Heading pb={8}>Sensor settings</Heading>
        <Button isDisabled={!isEditing} onClick={onOpen} colorScheme="green">
          Add sensor
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
                  addSetting(values);
                  console.log(values);
                  actions.resetForm();
                  onClose();
                }}
              >
                {(props) => (
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

                      <FormLabel w="100%" pl={2} htmlFor="origin">
                        Origin
                      </FormLabel>
                      <Select
                        name="origin"
                        onChange={props.handleChange}
                        variant="outline"
                        onBlur={props.handleBlur}
                        style={{ display: "block" }}
                        value={props.values.origin}
                        color={textColor}
                        id="origin"
                      >
                        <option hidden value="">
                          -- select --
                        </option>
                        <option key="1" value="arduino_1">
                          arduino_1
                        </option>
                        <option key="2" value="arduino_2">
                          arduino_2
                        </option>
                      </Select>

                      <Field placeholder="port" name="port" type="input">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.touched.name}>
                            <FormLabel htmlFor="value">Port</FormLabel>
                            <Input
                              {...field}
                              value={props.values.port.toUpperCase()}
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
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box
          style={{ overflowY: "scroll" }}
          h="75%"
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
              {sensorSettings.length > 0 &&
                sensorSettings.map((sensor) => (
                  <Tr key={sensor.id}>
                    <Td style={{ width: "50px" }}>
                      <Checkbox
                        isDisabled={!isEditing}
                        isChecked={sensor.enabled}
                        onChange={(e) =>
                          setEnabledSetting(sensor.id, e.target.checked)
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
                        onClick={() => deleteSensorFromSetting(sensor.id)}
                        isDisabled={!isEditing}
                        // disabled={sensor.isDeleting}
                        colorScheme="red"
                      >
                        {sensor.isDeleting ? (
                          <span></span>
                        ) : (
                          <span>Delete</span>
                        )}
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
                    <div className="p-2">No sensors in database</div>
                  </td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

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
        {/* <Divider />
        <HStack justifyContent="left">
          <VStack justifyContent="left">
            <Heading ml="0">Database</Heading>
            <p>Seed the database with 10 waypoints</p>
            <Button onClick={() => seedDatabase()}>SEED</Button>
          </VStack>
        </HStack> */}
      </Box>
    </Flex>
  );
};

export default Settings;
