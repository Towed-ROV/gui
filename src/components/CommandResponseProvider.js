import React, { createContext, useState } from "react";

export const CommandResponseContext = createContext(null);

const testCommand = [{ name: "Temp", value: 0.5 }];
const testResponses = [];

export const CommandResponseProvider = (props) => {
  const [commands, setCommands] = useState(testCommand);
  const [responses, setResponses] = useState(testResponses);

  const addCommand = (cmd) => {
    setCommands((oldCommands) => [...oldCommands, cmd]);
  };

  const addResponse = (respp) => {
    setResponses((oldResponses) => [...oldResponses, respp]);
  };

  return (
    <CommandResponseContext.Provider
      value={{
        commands,
        responses,
        addCommand,
        addResponse,
      }}
    >
      {props.children}
    </CommandResponseContext.Provider>
  );
};
