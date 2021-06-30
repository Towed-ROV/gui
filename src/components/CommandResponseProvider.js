import React, { createContext, useState } from "react";

export const CommandResponseContext = createContext(null);

const testCommand = [];
const testResponses = [];

export const CommandResponseProvider = (props) => {
  const [commands, setCommands] = useState(testCommand);
  const [responses, setResponses] = useState(testResponses);
  const [referenceLine, setReferenceLine] = useState(0);
  const [sensorData, setSensorData] = useState([]);
  const [alarmData, setAlarmData] = useState([]);
  // const [alarmData, setAlarmData] = useState([{ "name": "leakage", "value": false }, { "name": "pres", "value": true }]);

  const addCommand = (cmd) => {
    setCommands((oldCommands) => [...oldCommands, cmd]);
  };

  const addResponse = (respp) => {
    setResponses((oldResponses) => [...oldResponses, respp]);
  };

  return (
    <CommandResponseContext.Provider
      value={{
        alarmData,
        setAlarmData,
        commands,
        responses,
        sensorData,
        setSensorData,
        referenceLine,
        addCommand,
        addResponse,
        setReferenceLine,
      }}
    >
      {props.children}
    </CommandResponseContext.Provider>
  );
};
