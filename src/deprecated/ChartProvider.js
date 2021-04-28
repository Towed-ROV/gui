import React, { createContext, useState } from "react";

export const ChartContext = createContext(null);

export const ChartProvider = (props) => {
  const [chartData, setChartData] = useState([]);
  const [referenceLines, setReferenceLines] = useState({
    set_point_depth: 0,
    surface: 0,
  });
  const [chartMode, setChartMode] = useState("default");
  const addChartData = (data) => {
    if (chartData.length > 100) {
      handleRemove();
    } else {
      setChartData((oldData) => [...oldData, data]);
    }
  };

  const clearAndSetChartMode = (name) => {
    setChartData([]);
    setChartMode(name);
  };

  const changeReference = (name, value) => {
    setReferenceLines({ ...referenceLines, [name]: value });
  };

  const handleRemove = () => {
    let items = [...chartData];
    let _ = items.shift();
    setChartData(items);
  };

  return (
    <ChartContext.Provider
      value={{
        chartMode,
        referenceLines,
        changeReference,
        chartData,
        addChartData,
        clearAndSetChartMode,
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};
