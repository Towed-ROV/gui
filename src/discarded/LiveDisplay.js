import {
  Grid,
  GridItem,
  Text,
  Radio,
  RadioGroup,
  useColorModeValue,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CommandResponseContext } from "../components/CommandResponseProvider";
import Chart from "../components/Chart";
import Minimap from "../components/Minimap";

const LiveDisplay = () => {
  const { addResponse, sensorData, setSensorData } = useContext(
    CommandResponseContext
  );
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");

  const ROLL_MODE = "roll";
  const DEPTH_MODE = "depth";
  const DEFAULT_MODE = "None";
  const [optionMode, setOptionMode] = useState(DEFAULT_MODE);
  const [displayMode, setDisplayMode] = useState("plot");

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/sensors/stream");
    eventSource.addEventListener("open", (e) => {});
    eventSource.addEventListener("stream", (event) => {
      try {
        // @ts-ignore
        let payload = JSON.parse(event.data);
        let name = payload.payload_name;
        let data = payload.payload_data;
        switch (name) {
          case "sensor_data":
            setSensorData(data);
            break;
          case "response":
            data.map((resp) => addResponse(resp));
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
    <Grid id="grid" templateColumns="repeat(2, 1fr)" w="100%" h="100%">
      <GridItem
        boxShadow="dark-lg"
        bg={boxColor}
        color={textColor}
        colSpan={1}
        mr={1}
      ></GridItem>

      <GridItem
        boxShadow="dark-lg"
        color={textColor}
        bg={boxColor}
        h="90%"
        colSpan={1}
        ml={1}
      >
        <HStack w="100%">
          <RadioGroup
            mt={2}
            ml={40}
            mr={40}
            onChange={setDisplayMode}
            value={displayMode}
          >
            <HStack>
              <Radio value="plot">
                {" "}
                <Text fontSize="lg">Plot</Text>
              </Radio>
              <Radio value="map">
                {" "}
                <Text fontSize="lg">Map</Text>
              </Radio>
            </HStack>
          </RadioGroup>
          {displayMode === "plot" ? (
            <RadioGroup
              my={2}
              color={textColor}
              onChange={setOptionMode}
              value={optionMode}
            >
              <Radio mr={6} value={DEFAULT_MODE}>
                <Text fontSize="lg">None</Text>
              </Radio>
              <Radio mr={6} fontSize="lg" value={DEPTH_MODE}>
                <Text fontSize="lg">Depth</Text>
              </Radio>
              <Radio fontSize="lg" value={ROLL_MODE}>
                <Text fontSize="lg">Roll</Text>
              </Radio>
            </RadioGroup>
          ) : (
            <Spacer />
          )}
        </HStack>
        {displayMode === "plot" ? <Chart chartMode={optionMode} /> : undefined}
        {displayMode === "map" ? <Minimap /> : undefined}
      </GridItem>
    </Grid>
  );
};
export default LiveDisplay;
