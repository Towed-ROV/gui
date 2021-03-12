import { useForceUpdate } from "@chakra-ui/hooks";
import React, { createContext, useMemo, useState } from "react";

export const CommandResponseContext = createContext(null);

const getRandomId = () => {
  return Math.floor(Math.random() * 10000000);
};

const testList = [{
  id: getRandomId(),
  command: {
    name: "Temp",
    value: 0.5,
  },
  response: {}
}];

export const CommandResponseProvider = (props) => {

  const [commandAndResponses, setCommandAndResponses] = useState(testList);

  const addCommand = (cmd) => {
    let cmdResp = {
      id: getRandomId(),
      command: cmd,
      response: {},
    }
    setCommandAndResponses((oldCmdResps) => [...oldCmdResps, cmdResp]);
  };

  const addReponse = (response) => {
    let items = [...commandAndResponses];
    let newItems = []
    items.map((obj) => {
      if (response.name === obj.command.name) {
          if (Object.keys(obj.response).length === 0) {
            console.log("Adding: ", response)
            obj["response"] = response
          }
      }
      newItems.push(obj);
    })
    setCommandAndResponses(newItems);
  };

  return (
    <CommandResponseContext.Provider
      value={{
        commandAndResponses,
        addCommand,
        addReponse,
      }}
    >
      {props.children}
    </CommandResponseContext.Provider>
  );
};
