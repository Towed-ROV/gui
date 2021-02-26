import React, { createContext, useMemo, useState } from "react";

export const SettingsContext = createContext(null);

export const SettingsProvider = (props) => {
  const exampleSensor = {
    name: "str",
    origin: "str",
    role: "str",
    port: "str",
  };
  const [sensorSettings, setSensorSettings] = useState([]);

  const addSensorToSettings = (sensor) => {
    setSensorSettings((oldSettings) => [...oldSettings, sensor]);
  };

  const removeSensorFromSettings = (name) => {
    setSensorSettings(
      sensorSettings.filter((sensorSetting) => sensorSetting.name !== name)
    );
  };

  const setNewSettings = (newSettings) => {
    setSensorSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        sensorSettings,
        addSensorToSettings,
        removeSensorFromSettings,
        setNewSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
