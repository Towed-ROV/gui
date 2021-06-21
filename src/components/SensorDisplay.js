import {
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Alert,
  useToast,
  useColorModeValue,
  Wrap,
  WrapItem,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";
import { SENSOR_LIVE_STREAM } from "../db/config";
import { CommandResponseContext } from "./CommandResponseProvider";

const SensorDisplay = () => {
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const toast = useToast();
  const { sensorData, setSensorData, addResponse, alarmData, setAlarmData } = useContext(
    CommandResponseContext
  );

  const checkForAlarms = (alarmData) => {

    if (alarmData.value == true) {
      toast({
        title: `${alarmData.name} has occured`,
        status: "error",
        position: "bottom-left",
        isClosable: true,
      });
    };
  };

  checkForAlarms(alarmData);

  useEffect(() => {
    if (alarmData) {
      // const { title, body } = toastMessage;

      for (let i = 0; i < alarmData.length; i++) {
        if (alarmData[i]["value"]) {
          toast({
            title: alarmData[i]["name"],
            // description: body,
            status: 'error',
            duration: 9000,
            position: "bottom-left",
            isClosable: true
          });
        }
      }


    }
  }, [alarmData, toast]);

  useEffect(() => {
    let eventSource = new EventSource(SENSOR_LIVE_STREAM);
    eventSource.addEventListener("open", (e) => { });
    eventSource.addEventListener("stream", (event) => {
      try {
        // @ts-ignore
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        // test  
        // let name = "sensor_value";
        // let data = {
        //   "name": "leakage",
        //   "value": true
        // };

        switch (name) {
          case "sensor_data":
            setSensorData(data);
            break;
          case "response":
            data.map((resp) => addResponse(resp));
            break;
          case "alarm":
            // we need to add this for a pop up display
            setAlarmData(data);
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });
    eventSource.addEventListener("close", (e) => {
      eventSource.close();
    });
    return () => eventSource.close();
  }, []);

  return (
    // <Wrap>
    //   {alarmData &&
    //           alarmData.map((alarm, idx) => (
    //     <WrapItem key={idx}>
    //       <Button
    //         onClick={() =>
    //           toast({
    //             title: `${alarmData} toast`,
    //             status: "error",
    //             position: "bottom-left",
    //             isClosable: true,
    //           })
    //         }
    //       >
    //         Show {alarmData} toast
    //       </Button>
    //     </WrapItem>
    //   ))}
    // </Wrap>,
    <VStack
      w="100%"
      h="100%"
      bg={boxColor}
      color={textColor}
      p={4}
      boxShadow="dark-lg"
    >
      {/* <Button
        onClick={() =>
          toast({
            position: "bottom-left",
            render: () => (
              <Box color="white" p={3} bg="blue.500">
                Hello World
              </Box>
            ),
          })
        }
      >
        Show Toast
      </Button> */}
      <Flex h="10%">
        <Center my={4} color={textColor} alig="center">
          <Heading alig="center" size="lg">
            METRICS
          </Heading>
        </Center>
      </Flex>
      <Flex h="90%" w="100%">
        <Table variant="striped" colorScheme="blackAlpha" size="sm" h="100%">
          <Thead>
            <Tr>
              <Th style={{ width: "200px", textAlign: "left" }}>Name</Th>
              <Th isNumeric style={{ width: "200px", textAlign: "right" }}>
                Value
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sensorData &&
              sensorData.map((sensor, idx) => (
                <Tr key={idx}>
                  <Td style={{ width: "200px" }}>{sensor.name}</Td>
                  <Td isNumeric style={{ width: "200px" }}>
                    {sensor.value}
                  </Td>
                </Tr>
              ))}

            {/* {alarmData &&
              alarmData.map((alarm, idx) => (
                <Tr key={idx}>
                  <Alert
                    status={alarm.value ? "error" : "success"}
                    justifyContent="flex-start"
                  >
                    <Td style={{ width: "200px" }}>{alarm.name}</Td>
                    <Td isNumeric style={{ width: "200px" }}>
                      {alarm.value}
                    </Td>
                  </Alert>
                </Tr>
              ))} */}

            {!sensorData && (
              <Tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </Tr>
            )}
            {sensorData && !sensorData.length && (
              <Tr>
                <Td
                  style={{ textAlign: "center" }}
                  colSpan="4"
                  className="text-center"
                >
                  <div className="p-2">No data</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Flex>
      {/* <Wrap justify="space-evenly" w="100%" px={4}>
        {dummyData ? (
          dummyData.map((sensor, idx) => (
            <WrapItem key={idx}>
              <SensorCard sensor={sensor} />
            </WrapItem>
          ))
        ) : (
          <Text color={textColor}>Empty</Text>
        )}
      </Wrap> */}
      {/* {
        alarmData &&
        alarmData.map(alarm => {
          return toast({
            status: "error",
            position: "bottom-left",
            isClosable: true,
            render: () => {
              return alarm.value ? <Box color="white" p={3} bg="red.500">
                {alarm.name} is True
              </Box> : ""
            },
          })
        })
      } */}
    </VStack>
  );
};

export default SensorDisplay;
