import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContext } from "./ChartProvider";

const Chart = () => {
  const textColor = useColorModeValue("blackAlpha.900", "gray.200");
  const { referenceLines, chartData, chartMode } = useContext(ChartContext);

  return (
    <Box>
      {chartMode !== "default" ? (
        <LineChart width={850} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            stroke={textColor === "blackAlpha.900" ? "black" : "white"}
            dataKey="counter"
            interval={2}
          />
          <YAxis
            reversed={true}
            stroke={textColor === "blackAlpha.900" ? "black" : "white"}
          />
          <ReferenceLine
            strokeWidth={5}
            ifOverflow="extendDomain"
            y={referenceLines[chartMode]}
            label={chartMode}
            stroke="red"
            strokeDasharray="3 3"
          />
          <Line
            strokeWidth={3}
            isAnimationActive={false}
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
          />
        </LineChart>
      ) : (
        <Flex>None selected.</Flex>
      )}
    </Box>
  );
};

export default Chart;
