import React, { createContext, useState } from "react";

export const ChartContext = createContext(null);

export const ChartProvider = (props) => {
  const [chartData, setChartData] = useState([]);
  const [referenceLines, setReferenceLines] = useState({ set_point_depth: 0, surface: 0 });

  const addChartData = (data) => {
    setChartData((oldData) => [...oldData, data]);
  };

  const changeReference = (name, value) => {
    setReferenceLines({...referenceLines, [name]: value});
  };

  return (
    <ChartContext.Provider
      value={{
        referenceLines,
        changeReference,
        chartData,
        addChartData,
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};
