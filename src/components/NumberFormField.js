import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

import {
  Button,
  FormErrorMessage,
  Input,
  FormLabel,
  Select,
  FormControl,
  Flex,
  useColorModeValue,
  VStack,
  Text,
  Divider,
  Stat,
  StatLabel,
  StatHelpText,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
} from "@chakra-ui/react";
import { sendCommand } from "../fake_db/utils";

const availableControlNames = [
  { name: "target_distance", id: 0 },
  { name: "camera_offset_angle", id: 1 },
  { name: "pid_depth_p", id: 2 },
  { name: "pid_depth_i", id: 3 },
  { name: "pid_depth_d", id: 4 },
  { name: "pid_roll_p", id: 5 },
  { name: "pid_roll_i", id: 6 },
  { name: "pid_roll_d", id: 7 },
  { name: "depth_beneath_rov_offset", id: 8 },
  { name: "depth_rov_offset", id: 9 },
];

const dummy = [
  {
    id: 0,
    command: {
      name: "target_distance",
      value: 0.5,
    },
    response: {
      name: "target_distance",
      success: true,
    },
  },
  {
    id: 1,
    command: {
      name: "pid_roll_p",
      value: 0.5,
    },
    response: {
      name: "pid_roll_p",
      success: true,
    },
  },
  {
    id: 2,
    command: {
      name: "depth_rov_offset",
      value: 0.5,
    },
    response: {
      name: "depth_rov_offset",
      success: true,
    },
  },
];

const NumberFormField = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const [messages, setMessages] = useState(dummy);

  const validateInput = (value) => {
    let error;
    if (!value) {
      error = "Value is required";
    } else if (isNaN(value)) {
      error = "Not a number";
    }
    return error;
  };

  const addMessage = (name, value) => {
    let id = Math.floor(Math.random() * 1000);
    let dummyMSG = {
      id: id,
      command: {
        name: name,
        value: value,
      },
      response: {
        name: name,
        success: false,
      },
    };
    setMessages((oldMessages) => [...oldMessages, dummyMSG]);
  };

  return (
    <VStack p={4} w="100%" h="100%">
      <Flex w="100%">
        <VStack
          border="1px"
          borderColor="blackAlpha.800"
          p={2}
          w="100%"
          h="400px"
          style={{ overflowY: "auto" }}
        >
          <Text fontSize="2xl" color={textColor}>
            Messages
          </Text>
          <Table variant="striped" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th style={{ width: "50px", textAlign: "left" }}>Commands</Th>
                <Th style={{ width: "50px", textAlign: "right" }}>Responses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages
                .map((msg) => (
                  <Tr key={msg.id}>
                    <Td style={{ textAlign: "left" }} color={textColor}>
                      {msg.command.name} to {msg.command.value}
                    </Td>
                    <Td style={{ textAlign: "right" }} color={textColor}>
                      {msg.response.name} [
                      {msg.response.success ? "Success" : "Failed"}]
                    </Td>
                  </Tr>
                ))
                .reverse()}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
      <Flex w="100%">
        <Formik
          initialValues={{ name: "", value: "" }}
          onSubmit={(data, actions) => {
            var number = Number(data.value);
            // sendCommand(data.name, data.value);
            // console.log(data);
            addMessage(data.name, number);
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form>
              <FormLabel color={textColor} htmlFor="name">
                Name
              </FormLabel>

              <Select
                name="name"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                style={{ display: "block" }}
                value={props.values.name}
                color={textColor}
                id="name"
              >
                <option hidden value="">
                  Name
                </option>
                {availableControlNames.map((nameObj) => {
                  return (
                    <option key={nameObj.id} value={nameObj.name}>
                      {nameObj.name}
                    </option>
                  );
                })}
              </Select>

              <Field
                placeholder="value"
                name="value"
                type="input"
                validate={validateInput}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.value && form.touched.value}
                  >
                    <FormLabel color={textColor} htmlFor="value">
                      Value
                    </FormLabel>
                    <Input
                      {...field}
                      id="value"
                      placeholder="value"
                      autoComplete="off"
                      color={textColor}
                    />
                    <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                bg="teal"
                onClick={props.handleReset}
                isLoading={props.isSubmitting}
                color={textColor}
                mr={8}
              >
                Reset
              </Button>
              <Button
                ml={8}
                mt={4}
                bg="teal"
                isLoading={props.isSubmitting}
                type="submit"
                color={textColor}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </VStack>
  );
};

export default NumberFormField;
