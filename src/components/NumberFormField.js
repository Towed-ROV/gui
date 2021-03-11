import React, { useEffect } from "react";
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

const availableControlNames = [
  { name: "target_distance"},
  { name: "camera_offset_angle"},
  { name: "pid_depth_p"},
  { name: "pid_depth_i"},
  { name: "pid_depth_d"},
  { name: "pid_roll_p"},
  { name: "pid_roll_i"},
  { name: "pid_roll_d"},
  { name: "depth_beneath_rov_offset"},
  { name: "depth_rov_offset"}
];

const NumberFormField = (props) => {
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

  useEffect(() => {
    //
  }, []);

  return (
    <Flex p={4}>
      <Formik
        initialValues={{ name: "", value: "" }}
        onSubmit={(data, actions) => {
          // var number = Number(data.value);
          // sendCommand(data.name, data.value);
          console.log(actions)
          actions.setFieldValue()
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
              color={textColor}
              id="name"
            >
              <option hidden value="">Placeholder</option>
              {availableControlNames.map((data, index) => {
                  return <option value={data.name}>{data.name}</option>
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
