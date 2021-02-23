import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

const Settings = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [availableSensors, setAvailableSensor] = useState([]);
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const handleChange = (checkList) => {
    setSelectedSensors(checkList);
  };

  const fetchSensorOptions = () => {
    let s1 = { name: "Sensor 1", isChecked: false };
    let s2 = { name: "Sensor 2", isChecked: false };
    let s3 = { name: "Sensor 3", isChecked: true };
    setAvailableSensor([s1, s2, s3]);
    setIsUpdated(true);
  };

  const handleSubmit = () => {
    // Store data in Context, then display the seleted ones in Dashboard
    console.log("Saving: ", selectedSensors);
  };

  return (
    <Flex
      h="80vh"
      mx="2vw"
      bg={boxColor}
      color={textColor}
      justify="center"
      align="center"
    >
      <VStack spacing="24px">
        <Button onClick={fetchSensorOptions}>Fetch</Button>
        {!isUpdated ? (
          <Text>No data available</Text>
        ) : (
          <CheckboxGroup onChange={handleChange} colorScheme="green">
            <Stack>
              {availableSensors.map((item, index) => (
                <Checkbox
                  key={index}
                  value={item.name}
                  isChecked={item.isChecked}
                >
                  {item.name}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        )}
        <Button onClick={handleSubmit}>Submit</Button>
        <ul>
          {selectedSensors.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </VStack>
    </Flex>
  );
};

export default Settings;
