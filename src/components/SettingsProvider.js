import React, { createContext, useState } from "react";

export const SettingsContext = createContext(null);

export const SettingsProvider = (props) => {
  const [sensorSettings, setSensorSettings] = useState([]);

  const addSensorToSettings = (sensor) => {
    console.log(JSON.stringify(sensor, null, 2));
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
