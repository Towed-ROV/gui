import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartContext } from "./ChartProvider";

const Chart = () => {

    const textColor = useColorModeValue("blackAlpha.900", "gray.200");
    const { referenceLines, chartData, chartMode } = useContext(ChartContext);

    
    // const [data, setData] = useState()
    


    return(
        <Box>
            {chartMode !== "default" ? <LineChart  width={850} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            stroke={textColor === "blackAlpha.900" ? "black" : "white"}
            dataKey="counter"
            interval={10}
            />
            <YAxis
            stroke={textColor === "blackAlpha.900" ? "black" : "white"}
            />
            <ReferenceLine ifOverflow="extendDomain" y={referenceLines[chartMode]} label={chartMode} stroke="red" strokeDasharray="3 3" />
            <Line isAnimationActive={false} type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart> : <Flex>None selected.</Flex>}
        </Box>
        
    );
};

export default Chart;


