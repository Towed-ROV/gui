import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  FormErrorMessage,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import axios from "axios";

const postSome = async (url, number) => {
  const myCmd = {
    name: "temperature",
    value: 0,
  };

  myCmd.value = number;

  try {
    const response = await axios.post(url, myCmd);
    const data = await response.data;
    console.log(await JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const NumberFormField = () => {
  const CMD_URL = "http://localhost:8000/commands/cmd";

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
    <Formik
      initialValues={{ value: "" }}
      onSubmit={(data, actions) => {
        var number = Number(data.value);
        // postSome(CMD_URL, number);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Field
            placeholder="value"
            name="value"
            type="input"
            validate={validateInput}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.value && form.touched.value}>
                <FormLabel htmlFor="value">Value</FormLabel>
                <Input
                  {...field}
                  id="value"
                  placeholder="value"
                  autoComplete="off"
                />
                <FormErrorMessage>{form.errors.value}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NumberFormField;
