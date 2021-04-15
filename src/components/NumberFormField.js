import React, { useContext } from "react";
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
  HStack,
  GridItem,
  SimpleGrid,
  InputGroup,
  InputRightAddon,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { sendCommand } from "../fake_db/crud";
import { CommandResponseContext } from "./CommandResponseProvider";
import { validateInput } from "../helpers/validate";
import { rovControlNames } from "../fake_db/settings";
import { ChevronRightIcon } from "@chakra-ui/icons";

// const fakeCMD = [
//   {
//     name: "temperature",
//     value: 20.53,
//   },
//   {
//     name: "heat",
//     value: 1.02,
//   },
//   {
//     name: "oxygen",
//     value: 0.1004,
//   },
//   {
//     name: "depth",
//     value: 104,
//   },
// ];

// const fakeRES = [
//   {
//     name: "Temperature",
//     success: true,
//   },
//   {
//     name: "Temperature",
//     success: false,
//   },
//   {
//     name: "Temperature",
//     success: true,
//   },
//   {
//     name: "Temperature",
//     success: false,
//   },
// ];

const NumberFormField = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const { commands, responses, addCommand, setReferenceLine } = useContext(
    CommandResponseContext
  );

  const displayCommand = (name, value) => {
    let cmd = {
      name: name,
      value: value,
    };
    addCommand(cmd);

    // UI Chart Feature
    if (name === "set_point_depth") {
      setReferenceLine(value);
    }
  };

  return (
    <VStack
      justifyContent="space-evenly"
      h="100%"
      bg={boxColor}
      p={4}
      boxShadow="dark-lg"
    >
      <Box w="100%" h="70%">
        <VStack
          style={{ overflowY: "scroll" }}
          w="100%"
          h="400px" // TODO: Fix better
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
          <HStack w="100%" justifyContent="space-evenly" fontSize="xl">
            <Flex w="100%" justifyContent="center">
              <Text fontWeight="bold" color={textColor}>
                COMMANDS
              </Text>
            </Flex>
            <Flex w="100%" justifyContent="center">
              <Text fontWeight="bold" color={textColor}>
                RESPONSES
              </Text>
            </Flex>
          </HStack>
          <SimpleGrid w="100%" h="100%" columns={2}>
            <GridItem>
              {commands &&
                commands
                  .map((cmd, idx) => (
                    <Alert
                      status="info"
                      my={2}
                      key={idx}
                      justifyContent="flex-start"
                    >
                      <AlertIcon />
                      <Text casing="capitalize" fontSize="sm" color={textColor}>
                        {cmd.name}
                      </Text>
                      <ChevronRightIcon color={textColor} />
                      <Text fontSize="sm" color={textColor} fontWeight="bold">
                        {cmd.value.toString()}
                      </Text>
                    </Alert>
                  ))
                  .reverse()}
              {commands && !commands.length && (
                <Flex align="center" justify="center">
                  No data
                </Flex>
              )}
            </GridItem>
            <GridItem>
              {responses &&
                responses
                  .map((resp, idx) => (
                    <Alert
                      status={resp.success ? "success" : "error"}
                      my={2}
                      key={idx}
                      justifyContent="flex-end"
                    >
                      <AlertIcon />
                      <Text casing="capitalize" fontSize="sm" color={textColor}>
                        {resp.name}
                      </Text>
                    </Alert>
                  ))
                  .reverse()}
              {responses && !responses.length && (
                <Flex align="center" justify="center">
                  No data
                </Flex>
              )}
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Box>
      <Box w="100%" h="30%" pl={2}>
        <Formik
          initialValues={{ name: "", value: "" }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            var name = data.name;
            var value = Number(data.value);
            sendCommand(name, value);
            displayCommand(name, value);
            actions.setFieldValue("value", "", false);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <FormLabel ml={4} color={textColor} htmlFor="name">
                Name
              </FormLabel>
              <InputGroup>
                <Select
                  name="name"
                  onChange={props.handleChange}
                  variant="outline"
                  onBlur={props.handleBlur}
                  style={{ display: "block" }}
                  value={props.values.name}
                  color={textColor}
                  id="name"
                  w="100%"
                >
                  <option hidden value="">
                    -- select --
                  </option>
                  {rovControlNames.map((nameObj) => {
                    return (
                      <option key={nameObj.id} value={nameObj.name}>
                        {nameObj.name}
                      </option>
                    );
                  })}
                </Select>
                <InputRightAddon bg={boxColor}>
                  <Button
                    bg="teal"
                    minWidth="8rem"
                    onClick={props.handleReset}
                    isLoading={props.isSubmitting}
                    color="white"
                  >
                    Reset
                  </Button>
                </InputRightAddon>
              </InputGroup>

              <Field
                placeholder="value"
                name="value"
                type="input"
                validate={validateInput}
                w="100%"
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.value && form.touched.value}
                  >
                    <FormLabel ml={4} color={textColor} htmlFor="value">
                      Value
                    </FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="value"
                        placeholder="value"
                        autoComplete="off"
                        color={textColor}
                      />

                      <InputRightAddon bg={boxColor}>
                        <Button
                          minWidth="8rem"
                          bg="teal"
                          isLoading={props.isSubmitting}
                          type="submit"
                          color="white"
                        >
                          Submit
                        </Button>
                      </InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>
    </VStack>
  );
};

export default NumberFormField;
