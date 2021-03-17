import {
  Flex,
  IconButton,
  useColorModeValue,
  VStack,
  HStack,
  Stack,
  Text,
  Link,
  Button,
  Divider,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  SettingsContext,
  SettingsProvider,
} from "../components/SettingsProvider";

import api from "../services/api";
import { Field, Form, Formik } from "formik";

const db = [
  {
    id: 3,
    name: "Temperature",
    origin: "Arduino 1",
    role: "PUB",
    port: "A5",
    enabled: false,
  },
  {
    id: 22,
    name: "Pressure",
    origin: "Arduino 2",
    role: "PUBSUB",
    port: "COM4",
    enabled: false,
  },
  {
    id: 1,
    name: "Humidity",
    origin: "Arduino 3",
    role: "SUB",
    port: "D11",
    enabled: false,
  },
  {
    id: 99,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 33,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 13,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 6,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 66,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
];

const Home = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const { sensorSettings } = useContext(SettingsContext);


  return (
    <Flex
      h="92vh"
      mx="1vw"
      my="1vh"
      boxShadow="dark-lg"
      rounded="lg"
      color={textColor}
      bg={boxColor}
      align="center"
      justify="center"
    >
      <VStack>
        <Text fontSize="2xl">TOWED ROV 2021</Text>
        <Link isExternal={true} href="https://github.com/Towed-ROV">
          <IconButton
            colorScheme="teal"
            aria-label="Github"
            size="lg"
            href="www.google.no"
            icon={<ExternalLinkIcon />}
          />
        </Link>
      </VStack>
    </Flex>
  );
};

export default Home;
