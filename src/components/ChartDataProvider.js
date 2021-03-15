import React, { createContext, useState } from "react";

export const ChartDataContext = createContext(null);

export const ChartDataProvider = (props) => {
  const [chartData, setChartData] = useState([]);

  const addChartData = (data) => {
    setChartData((oldData) => [...oldData, data]);
  };

  return (
    <ChartDataContext.Provider
      value={{
        chartData,
        addChartData,
      }}
    >
      {props.children}
    </ChartDataContext.Provider>
  );
};
