import React from "react";
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
} from "@chakra-ui/react";
import { sendCommand } from "../fake_db/utils";

const NumberFormField = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const validateInput = (value) => {
    let error;
    if (!value) {
      error = "Value is required";
    } else if (isNaN(value)) {
      error = "Not a number";
    }
    return error;
  };

  return (
    <Flex p={12}>
      <Formik
        initialValues={{ name: "", value: "" }}
        onSubmit={(data, actions) => {
          // var number = Number(data.value);
          sendCommand(data.name, data.value);
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
              placeholder="Select name"
              color={textColor}
              id="name"
            >
              <option value="set_point" label="set_point" />
              <option value="camera_tilt" label="camera_tilt" />
              <option value="pid_depth_p" label="pid_depth_p" />
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
  );
};

export default NumberFormField;
