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
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { sendCommand } from "../fake_db/crud";
import { CommandResponseContext } from "./CommandResponseProvider";
import { validateInput } from "../helpers/validate";
import { rovControlNames } from "../fake_db/settings";

const NumberFormField = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");

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
    <VStack p={4} w="100%" h="100%">
      <Flex w="100%" h="100%">
        <VStack
          border="1px"
          borderColor="blackAlpha.800"
          p={2}
          style={{ overflowY: "auto" }}
          w="100%"
          maxH="350px"
        >
          <HStack p={2} w="100%" fontSize="2xl">
            <Text variant="solid" color={textColor}>
              COMMANDS
            </Text>
            <Spacer />
            <Text variant="solid" color={textColor}>
              RESPONSES
            </Text>
          </HStack>
          <SimpleGrid w="100%" h="100%" columns={2}>
            <GridItem>
              {commands ? (
                commands
                  .map((cmd, idx) => (
                    <Flex key={idx} my={4} justifyContent="flex-start">
                      <Text fontSize="md" color={textColor} my={2}>
                        {cmd.name} to {cmd.value.toString()}
                      </Text>
                    </Flex>
                  ))
                  .reverse()
              ) : (
                <Text float="left" color={textColor}>
                  EMPTY
                </Text>
              )}
            </GridItem>
            <GridItem>
              {responses ? (
                responses
                  .map((resp, idx) => (
                    <Flex key={idx} my={4} justifyContent="flex-end">
                      <Badge
                        my={2}
                        float="right"
                        variant="solid"
                        fontSize="sm"
                        colorScheme={resp.success ? "green" : "red"}
                      >
                        {resp.name}
                      </Badge>
                    </Flex>
                  ))
                  .reverse()
              ) : (
                <Text float="right" color={textColor}>
                  EMPTY
                </Text>
              )}
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
      <Flex w="100%">
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
              <FormLabel color={textColor} htmlFor="name">
                Name
              </FormLabel>
              <Select
                name="name"
                onChange={props.handleChange}
                variant="outline"
                onBlur={props.handleBlur}
                style={{ display: "block" }}
                value={props.values.name}
                color={textColor}
                id="name"
              >
                <option hidden value="">
                  Name
                </option>
                {rovControlNames.map((nameObj) => {
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
