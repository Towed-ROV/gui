import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CommandResponseContext } from "./CommandResponseProvider";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getEmptyArray } from "../helpers/utils";

const Chart = ({ chartMode }) => {
  const textColor = useColorModeValue("#000000", "#E2E8F0");
  const boxColor = useColorModeValue("#E2E8F0", "#4A5568");
  const chartComponent = useRef(null);
  const { sensorData, referenceLine } = useContext(CommandResponseContext);
  const [counter, setCounter] = useState(0);
  const MAX_ELEMENTS = 60 * 5; // 300 samples per 1 minute

  const [chartOptions, setChartOptions] = useState({
    chart: {
      style: {
        color: textColor,
        // height: "300px",
        // width: "300px",
      },
      backgroundColor: boxColor,
      animation: false,
      legend: false,
    },
    xAxis: {
      labels: {
        style: {
          color: textColor,
        },
      },
      type: "datetime",
    },
    yAxis: {
      labels: {
        style: {
          color: textColor,
        },
      },
      gridLineColor: "#9e9e9e",
      reversed: true,
      plotLines: [
        {
          value: 40,
          color: "red",
          dashStyle: "shortdash",
          width: 2,
          label: {
            text: "Setpoint",
          },
        },
      ],
    },
    legend: {
      enabled: false,
    },
    title: {
      text: null,
    },

    series: [
      {
        name: "",
        type: "line",
        lineWidth: 2,
        data: getEmptyArray(MAX_ELEMENTS),
      },
    ],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    setChartOptions({
      chart: {
        style: {
          color: textColor,
        },
        backgroundColor: boxColor,
      },

      xAxis: {
        labels: {
          style: {
            color: textColor,
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            color: textColor,
          },
        },
      },
    });
  }, [textColor, boxColor]);

  useEffect(() => {
    let seriesSettings = {};

    switch (chartMode) {
      case "None":
        seriesSettings = {
          series: [
            {
              name: "",
              type: "line",
              data: getEmptyArray(MAX_ELEMENTS),
            },
          ],
          yAxis: {
            plotLines: [],
          },
        };
        break;

      case "roll":
        seriesSettings = {
          yAxis: {
            plotLines: [
              {
                value: 0,
                color: "red",
                dashStyle: "shortdash",
                width: 2,
                label: {
                  text: "Surface",
                },
              },
            ],
          },
        };
        break;

      case "depth":
        seriesSettings = {
          yAxis: {
            plotLines: [
              {
                value: referenceLine,
                color: "red",
                dashStyle: "shortdash",
                width: 2,
                label: {
                  text: "Setpoint",
                },
              },
            ],
          },
        };
        break;

      default:
        break;
    }

    // @ts-ignore
    setChartOptions({ ...seriesSettings });
  }, [chartMode, referenceLine]);

  useEffect(() => {
    if (counter % 2 === 0) {
      const chart = chartComponent.current.chart;
      sensorData.forEach((sensor) => {
        if (sensor.name === chartMode) {
          let x = new Date().getTime();
          let y = sensor.value;
          chart.series[0].addPoint([x, y], true, true);
        }
      });
    }
    setCounter(counter + 1);
  }, [sensorData, chartMode]);

  return (
    <Flex w="100%" h="100%">
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { height: "100%", width: "100%" } }}
        ref={chartComponent}
        options={chartOptions}
        oneToOne={true}
      />
    </Flex>
  );
};

export default Chart;
